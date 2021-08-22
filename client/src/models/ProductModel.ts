class ProductModel {
    id: string
    description: string
    title: string
    link: string
    imageLink: string
    price: number
    availability: string
    currency: string
    brand: string
    condition: string
    shipping: string

    constructor(data: ProductModel) {
        this.id = data.id
        this.description = data.description
        this.title = data.title
        this.link = data.link
        this.imageLink = data.imageLink
        this.price = data.price
        this.availability = data.availability
        this.currency = data.currency
        this.brand = data.brand
        this.condition = data.condition
        this.shipping = data.shipping
    }
}

export default ProductModel