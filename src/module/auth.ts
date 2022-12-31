import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

const NOT_AUTHORIZED = "Not authorized";

interface RequestWithPayload extends Request {
  user: {
    payload: {
      [k: string]: string;
    };
  };
}

export const createToken = ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  const token = jwt.sign({ id, username }, config.secret);
  return token;
};

export const protect = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { authorization: bearer },
  } = req;

  if (!bearer) {
    res.status(401).send(NOT_AUTHORIZED);
    return;
  }

  const [, token] = bearer.split("");

  if (!token) {
    res.status(401).send(NOT_AUTHORIZED);
    return;
  }

  try {
    const payload = jwt.verify(token, config.secret);
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send(NOT_AUTHORIZED);
    return;
  }
};

export const comparePassword = (pass: string, hash: string) =>
  bcrypt.compare(pass, hash);

export const hashPassword = (pass: string) => bcrypt.hash(pass, 5);
