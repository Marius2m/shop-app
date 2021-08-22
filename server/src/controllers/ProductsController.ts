import { logger } from "~/config/logger"
import ProductsRepository from "~/repositories/ProductsRepository"
import { NotFoundError } from "~/utils/Errors"

export const getAll = async (req, res, next) => {
    const { skip = 0, limit = 10 } = req.query

    try {
        const products = await ProductsRepository.getAll({ skip, limit })
        
        res.json(products)
        next()
    } catch (err) {
        logger.error(err)

        res.status(500).json({error: 'Failed to retrieve products'})
        next()
    }
}

export const getById = async (req, res, next) => {
    const { id } = req.params

    try {
        const product = await ProductsRepository.getById({ id })
        
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        res.json(product)
        next()
    } catch (err) {
        next(err)
    }
}

}