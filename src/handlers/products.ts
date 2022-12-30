import { Request, Response, Next } from "express";
import prisma from "../module/db";
import { INVALID_INPUT_LENGTH } from '../config/constants'

export const getProducts = async (req: Request, res: Response, next: Next) => {
  const {
    user: { id },
  } = req;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    res.status(200).json({
      data: user.products,
    });
  } catch (e) {
    next(e);
  }
};

export const getProductById = async (req: Request, res: Response, next: Next) => {
  const {
    params: { id },
    user: { id: userId },
  } = req;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id,
          belongsToId: userId,
        },
      },
    });
    if (!product) {
      res.status(404).json({ message: "no product found" });
      return;
    }
  
    res.status(200).json({
      data: product,
    });
  } catch(e) {
    next(e)
  }
};

export const addProduct = async (req: Request, res: Response, next: Next) => {
  const {
    body: { name },
    user: { id: belongsToId },
  } = req;
  if (!name) {
    res.status(400).json({ message: 'product name is required' })
    return
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        belongsToId,
      },
    });
  
    res.status(200).json({ data: product });
  } catch(e) {
    e.input =  e.code === 'P2000' && INVALID_INPUT_LENGTH
    next(e)
  }
};

export const updateProduct = async (req: Request, res: Response, next: Next) => {
  const {
    user: { id: belongsToId },
    params: { id },
    body: { name },
  } = req;

  try {
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id,
          belongsToId,
        },
      },
      data: {
        name
      },
    });
  
    res.status(200).json({ data: { updated } });
  } catch(e) {
    next(e)
  }
};

export const deleteProduct = async (req: Request, res: Response, next: Next) => {
  const {
    user: { id: belongsToId },
    params: { id },
  } = req;

  try {
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id,
          belongsToId,
        },
      },
    });
  
    res.status(200).json({ data: { deleted } });
  } catch(e) {
    next(e)
  }
};
