import { ProductQuery } from '~/data/ProductQuery'
import { getDBSession } from '~/middlewares/DBConnection'

export default class ProductsRepository {
	static async getAll(): Promise<ProductQuery[]> {

		const query = `
            MATCH (product:Product)

            RETURN product
		`

		const result = await getDBSession().run(query)

        if (result.records?.length > 0) {
            const items = result.records.map(record => new ProductQuery(record.get('product').properties))

            return items
        }

        return []
    }
}
