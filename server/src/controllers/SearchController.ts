import SearchRepository from "~/repositories/SearchRepository"

export const getAll = async (req, res, next) => {
    const { skip = 0, limit = 10, term, filters } = req.query

    try {
        const products = await SearchRepository.getAll({ skip, limit, term, filters })

        res.json(products)
        next()
    } catch (err) {
        res.status(500).json({error: 'Failed to retrieve products'})
        next()
    }
}