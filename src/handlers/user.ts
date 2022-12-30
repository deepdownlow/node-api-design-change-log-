import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import prisma from "../module/db";
import { createToken, hashPassword, comparePassword } from "../module/auth";
import { DUPLICATE } from "../config/constants";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { username, password },
    } = req;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = createToken(user);
    res.json({ token });
  } catch (e) {
    e.input = DUPLICATE;
    next(e);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { username, password },
  } = req;
  try {
    const user = await prisma.user.findUnique({
      where: { id: username },
    });
    if (!user) {
      res.status(404).send("No user found");
      return;
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      res.status(401).send("Invalid username/password");
      return;
    }

    const token = createToken(user);
    res.json({ token });
  } catch (e) {
    next(e);
  }
};
