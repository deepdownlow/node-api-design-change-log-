import prisma from "../module/db";

export const getProducts = async (req, res) => {
  const {
    user: { id },
  } = req;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      products: true,
    },
  });

  res.status(200).json({
    data: user.products,
  });
};

export const getProductById = async (req, res) => {
  const {
    params: { id },
    user: {
        id: userId
    }
  } = req;
  const product = await prisma.product.findUnique({
    where: {
        id_belongsToId: {
            id,
            belongsToId: userId
        }
    }
  })
  if (!product) {
    res.status(404).json({ message: 'no product found' })
    return
  }

  res.status(200).json({
    data: product
  })
};

export const addProduct = async (req, res) => {
    const {
        body: { name },
        user: { id: belongsToId }
    } = req

    const product = await prisma.product.create({
        data: {
            name,
            belongsToId
        }
    })

    res.status(200).json({ data: product })
}

export const updateProduct = async (req, res) => {
    const {
        user: { id: belongsToId },
        params: { id },
        body: { name }
    } = req

    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id,
                belongsToId
            }
        },
        data: {
            name
        }
    })

    res.status(200).json({ data: { updated } })
}

export const deleteProduct = async (req, res) => {
    const {
        user: { id: belongsToId },
        params: { id }
    } = req

    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id,
                belongsToId
            }
        }
    })

    res.status(200).json({ data: { deleted } })
}