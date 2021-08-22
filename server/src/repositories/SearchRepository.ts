import { int } from 'neo4j-driver'
import { Integer } from 'neo4j-driver-core'

import { PaginatedQuery } from '~/data/PaginatedQuery'
import { ProductQuery } from '~/data/ProductQuery'
import { getDBSession } from '~/middlewares/DBConnection'

export default class SearchRepository {
	static async getAll({ skip, limit, term, filters }: { skip: number, limit: number, term: string, filters: string[] }): Promise<PaginatedQuery<ProductQuery>> {
		const queryParams = {
            skip: int(skip),
            limit: int(limit),
            term,
        }

        let termSubQuery = ''
        if (!!term) termSubQuery = `WHERE product.title CONTAINS ($term)`

		const query = `
            MATCH (product:Product)
            ${termSubQuery}
            WITH
                collect(product) as products,
                count(product) as itemsCount
            UNWIND products as product

            RETURN product, itemsCount
            SKIP $skip
            LIMIT $limit
		`

		const result = await getDBSession().run(query, queryParams)

        if (result.records?.length > 0) {
            const itemsCount = Integer.toNumber(result.records[0].get('itemsCount'))
            const items = result.records.map(record => new ProductQuery(record.get('product').properties))

            return new PaginatedQuery(items, skip, limit, itemsCount)
        }

        return new PaginatedQuery([], skip, limit)
	}
}
