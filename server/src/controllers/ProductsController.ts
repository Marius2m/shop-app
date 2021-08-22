import { logger } from "~/config/logger"
import ProductsRepository from "~/repositories/ProductsRepository"

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