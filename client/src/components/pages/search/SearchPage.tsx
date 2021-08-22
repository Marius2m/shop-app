import { useEffect, useState } from "react"
import { Card, Checkbox } from "antd"
import { useLocation } from "react-router-dom"

import PaginatedGrid from "../../common/paginated-grid/PaginatedGrid"
import LoadingIndicator from "../../common/loading-indicator/LoadingIndicator"
import ProductModel from "../../../models/ProductModel"
import PaginatedEntity from "../../../models/PaginatedEntity"
import SearchService from "../../../services/SearchService"

import styles from './SearchPage.module.scss'

function useQuery(location) {
    return new URLSearchParams(location.search)
}

const SearchPage = () => {
    const location = useLocation()
    let query = useQuery(location)
    const availableFilters = ['in-stock', 'brand']

    const [ isLoading, setIsLoading ] = useState(true)
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ products, setProducts ] = useState<PaginatedEntity<ProductModel>>()
    const [ selectedFilters, setSelectedFilters ] = useState<string[]>([])
    
    const limit = 4

    const onPageHandler = (page: number, pageSize: number | undefined) => setCurrentPage(page)

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true)
        }

        const skip = (currentPage - 1) * limit
        
        SearchService
            .search({
                filters: query.getAll('filters[]') ?? 'lol',
                searchTerm: query.get('term') ?? undefined,
                skip,
                limit,
            })
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => console.log('Erorr while retrieving results\n' + error))
    }, [currentPage, location])

    useEffect(() => {
        if (isLoading && !!products) {
            setIsLoading(false)
        }

    }, [products])

    const renderPage = (products: PaginatedEntity<ProductModel> | undefined) => {
        if (!!products && products?.items.length > 0) {
            return (<main className={styles.page}>
                <aside className={styles.filters}>
                    <Card title="Select filters">
                        <Checkbox.Group className={styles.filters__group} options={availableFilters} value={selectedFilters} onChange={onSelectedFilters} />
                    </Card>
                </aside>
                <section className={styles.content}>
                    <PaginatedGrid
                        products={products?.items}
                        total={products?.itemsCount}
                        pageSize={limit}
                        currentPage={currentPage}
                        onPageChange={onPageHandler}
                    />
                </section>
            </main>)
        } else {
            return (<p>No products available!</p>)
        }
    } 

    const onSelectedFilters = (filters) => setSelectedFilters(filters)

    return (
        isLoading 
            ? <LoadingIndicator size={'large'}/>
            : renderPage(products)
    )
}

export default SearchPage