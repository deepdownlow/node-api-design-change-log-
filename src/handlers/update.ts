import { Response } from "express";
import { RequestWithPayload } from '../types'
import prisma from "../module/db";



export const getUpdates = async (req: RequestWithPayload, res: Response) => {
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

export const getUpdateById = async (req: RequestWithPayload, res: Response) => {
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

export const createUpdate = async (req: RequestWithPayload, res: Response) => {
  const {
    user: { id: belongsToId },
    body: { productId }
  } = req;

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId
      }
    },
  });
  if(!product) {
    res.status(404).json({ message: 'no product found' })
    return 
  }

  const update = await prisma.update.create({
    data: req.body
  })

  res.status(200).json({ data: update });
};

export const update = async (req: RequestWithPayload, res: Response) => {
  const {
    user: { id: belongsToId },
    params: { id }
  } = req;

  const updated = await prisma.update.update({
    where: {
      id_belongsToId: {
        id,
        belongsToId,
      },
    },
    data: req.body
  });

  res.status(200).json({ data: { updated } });
};

export const deleteUpdate = async (req: RequestWithPayload, res: Response) => {
  const {
    user: { id },
    params: { id: updateId },
  } = req;

  const deleted = await prisma.update.delete({
    where: {
      id_belongsToId: {
        id: updateId,
        belongsToId: id,
      },
    },
  });

  res.status(200).json({ data: { deleted } });
};
