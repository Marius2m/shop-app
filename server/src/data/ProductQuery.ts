import { Integer } from 'neo4j-driver-core'

export class ProductQuery {
    id: string
    description: string
	title: string
    link: string
    imageLink: string
    availability: string
    price: number
    currency: string
    brand: string
    condition: string
    shipping: string
    externalId: string

	constructor(data) {
		this.id = data.id
		this.description = data.description
		this.title = data.title
        this.link = data.link
        this.imageLink = data.imageLink
        this.availability = data.availability
        this.price = Integer.toNumber(data.price)
        this.currency = data.currency
        this.brand = data.branad
        this.condition = data.condition
        this.shipping = data.shipping
        this.externalId = data.externalId
	}
}
