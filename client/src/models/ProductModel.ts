class ProductModel {
    id: string
    description: string
    title: string
    imageUrl: string
    price: number

    constructor(data: ProductModel) {
        this.id = data.id
        this.description = data.description
        this.title = data.title
        this.imageUrl = data.imageUrl
        this.price = data.price
    }
}

export default ProductModel