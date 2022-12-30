import { Request, Response } from "express";
import prisma from "../module/db";

export const getUpdates = async (req: Request, res: Response) => {
  const {
    user: { id },
  } = req;
  const updates = await prisma.update.findMany({
    where: {
      belongsToId: id
    },
  });

  res.status(200).json({
    data: updates
  });
};

export const getUpdateById = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });
  if (!update) {
    res.status(404).json({ message: "no update found" });
    return;
  }

  res.status(200).json({
    data: update,
  });
};

export const addUpdate = async (req: Request, res: Response) => {
  const {
    body: { title, body, version },
    user: { id: belongsToId },
  } = req;

  const product = await prisma.product.create({
    data: {
      name,
      belongsToId,
    },
  });

  res.status(200).json({ data: product });
};

export const update = async (req: Request, res: Response) => {
  const {
    user: { id: belongsToId },
    params: { id },
    body: { name },
  } = req;

  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id,
        belongsToId,
      },
    },
    data: {
      name,
    },
  });

  res.status(200).json({ data: { updated } });
};

export const deleteUpdate = async (req: Request, res: Response) => {
  const {
    user: { id: belongsToId },
    params: { id },
  } = req;

  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id,
        belongsToId,
      },
    },
  });

  res.status(200).json({ data: { deleted } });
};
