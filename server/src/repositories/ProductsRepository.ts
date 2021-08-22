import { int } from 'neo4j-driver'
import { Integer } from 'neo4j-driver-core'
import { v4 as uuidGen } from 'uuid';

import { PaginatedQuery } from '~/data/PaginatedQuery'
import Product from '~/data/Product'
import { ProductQuery } from '~/data/ProductQuery'
import { getDBSession } from '~/middlewares/DBConnection'

export default class ProductsRepository {
	static async getAll({ skip, limit }: { skip: number, limit: number }): Promise<PaginatedQuery<ProductQuery>> {
		const queryParams = {
            skip: int(skip),
            limit: int(limit)
        }

		const query = `
            MATCH (product:Product)
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

    static async getById({ id }: { id: string }): Promise<ProductQuery> {
		const queryParams = {
            id
        }

		const query = `
            MATCH (product:Product)
            WHERE product.id = $id

            RETURN product
		`

		const result = await getDBSession().run(query, queryParams)

        if (result.records?.length > 0) {
            return new ProductQuery(result.records[0].get('product').properties)
        }

        return null
	}

    static async create(product: Product): Promise<ProductQuery> {
		const queryParams = {
            properties: {
                ...product,
                id: uuidGen(),
            }
        }

		const query = `
            CREATE (product:Product)
            SET product = $properties

            RETURN product
		`

		const result = await getDBSession().run(query, queryParams)

        if (result.records?.length > 0) {
            return new ProductQuery(result.records[0].get('product').properties)
        }

        return null
	}
    
    static async remove(id: string): Promise<void> {
		const queryParams = {
            id
        }

		const query = `
            MATCH (product:Product)
            WHERE product.id = $id

            DETACH DELETE product
		`

		await getDBSession().run(query, queryParams)
	}
}
