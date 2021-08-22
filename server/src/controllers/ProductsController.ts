import { logger } from "~/config/logger"
import Product from "~/data/Product"
import ProductsRepository from "~/repositories/ProductsRepository"
import { NotFoundError, ServerError, UnprocessableEntityError } from "~/utils/Errors"

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

export const create = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            throw new UnprocessableEntityError('Missing mandatory request body')
        }
    
        const productData = new Product(req.body)

        const createdProduct = await ProductsRepository.create(productData)
        
        if (!createdProduct) {
            throw new ServerError('Failed to create product')
        }

        res.status(201).json(createdProduct)
        next()
    } catch (err) {
        next(err)
    }
}


export const remove = async (req, res, next) => {
    const { id } = req.params

    try {
        await ProductsRepository.remove(id)
        
        res.status(204).json()
        next()
    } catch (err) {
        next(err)
    }
}