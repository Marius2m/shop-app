import ProductsRepository from "~/repositories/ProductsRepository"

export const getAll = async (req, res, next) => {
    try {
        const products = await ProductsRepository.getAll()
        
        res.json(products)
        next()
    } catch (err) {
        res.status(500).json({error: 'Failed to retrieve products'})
        next()
    }
}