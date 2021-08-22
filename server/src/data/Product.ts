export default class Product {
    id: string
    title: string
    description: string
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
        this.price = data.price
        this.currency = data.currency
        this.brand = data.branad
        this.condition = data.condition
        this.shipping = data.shipping
        this.externalId = data.externalId
    }
}