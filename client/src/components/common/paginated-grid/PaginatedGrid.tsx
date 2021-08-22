import { Pagination } from "antd"

import ProductModel from "../../../models/ProductModel"
import ProductCard from "../product-card/ProductCard"

import styles from './PaginatedGrid.module.scss'

interface PaginatedGridProps {
    products: ProductModel[]
    total: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (page: number, pageSize: number | undefined) => any,
}

const PaginatedGrid: React.FC<PaginatedGridProps> = (props) => {
    const onPaginationChange = (page: number, pageSize: number | undefined) => {
        props.onPageChange(page, pageSize)
    }

    return (
        <>
            {(!!props.products && props?.products.length > 0)
                ?
                    (
                        <main className={styles.page}>
                            <section className={styles.content}>
                                <div className={styles.list}>
                                    {props?.products.map(item => <ProductCard key={item.id} product={item} />)}
                                </div>
                                <Pagination
                                    className={styles.pagination}
                                    current={props.currentPage}
                                    defaultCurrent={1}
                                    total={props.total}
                                    pageSize={props.pageSize}
                                    onChange={onPaginationChange}
                                    showSizeChanger={false}
                                />
                            </section>
                        </main>
                    )
                :
                    (<p>No products available!</p>)
            }
        </>
    )
}

export default PaginatedGrid