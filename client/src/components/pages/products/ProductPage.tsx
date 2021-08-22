import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import LoadingIndicator from "../../common/loading-indicator/LoadingIndicator"
import ProductModel from "../../../models/ProductModel"
import ProductService from "../../../services/ProductsService"

import styles from './ProductPage.module.scss'
import { Button } from "antd"

const ProductPage = () => {
    const params = useParams<{id: string}>()

    const [ isLoading, setIsLoading ] = useState(true)
    const [ product, setProduct ] = useState<ProductModel>()
    
    useEffect(() => {
        if (isLoading && !!product) {
            setIsLoading(false)
        }

        ProductService
            .getProduct(params.id)
            .then(response => {
                setProduct(response.data)
            })
            .catch(error => console.log('Erorr while retrieving product\n' + error))

    }, [])

    useEffect(() => {
        if (isLoading && !!product) {
            setIsLoading(false)
        }
    }, [product])

    console.log(product)

    return (
        isLoading 
            ? <LoadingIndicator size={'large'}/>
            : 
                <main>
                    <div className={styles.header}>{product?.title}</div>
                    <section>
                        <img className={styles.image} alt={'none'} src={product?.imageLink}></img>
                        <div className={styles.info1}>
                            {product?.brand && <div>Brand: {product.brand}</div>}
                            {product?.condition && <div>Condition: {product.condition}</div>}
                        </div>
                        <div className={styles.info2}>
                            {product?.availability && <div>Availability: {product.availability}</div>}
                            {product?.price && <div>Price: {product.price}</div>}
                        </div>
                    </section>
                    {product?.link &&
                        <Button type={"primary"} href={product.link} target="_blank" rel="noopener noreferrer">
                            See product on producer's page
                        </Button>
                    }
                    <p className={styles.description}>
                        {product?.description}
                    </p>
                </main>
    )
}

export default ProductPage
