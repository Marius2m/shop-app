import { useEffect, useState } from "react"

import LoadingIndicator from "../../common/loading-indicator/LoadingIndicator"
import PaginatedEntity from "../../../models/PaginatedEntity"
import ProductModel from "../../../models/ProductModel"

import PaginatedGrid from "../../common/paginated-grid/PaginatedGrid"
import ProductService from "../../../services/ProductsService"

const ProductsPage = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ products, setProducts ] = useState<PaginatedEntity<ProductModel>>()
    const limit = 6

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true)
        }

        const skip = (currentPage - 1) * limit
        
        ProductService
            .getAllProducts({limit, skip})
            .then(response => setProducts(response.data))
            .catch(error => console.log('Erorr while retrieving all products\n' + error))
    }, [currentPage])

    useEffect(() => {
        if (isLoading && !!products) {
            setIsLoading(false)
        }

    }, [products])

    const onPageHandler = (page: number, pageSize: number | undefined) => setCurrentPage(page)

    return (
        <main>
            <p style={{ textAlign: "center" }}> In this page you can see all products stored in the db </p>
            {isLoading || products === undefined
                ? 
                    <LoadingIndicator size={'large'}/>
                :
                    <PaginatedGrid
                        products={products?.items}
                        total={products?.itemsCount}
                        pageSize={limit}
                        currentPage={currentPage}
                        onPageChange={onPageHandler}
                    />
            }
        </main>
    )
}

export default ProductsPage