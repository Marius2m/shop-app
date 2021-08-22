import { HeartOutlined, HeartTwoTone, ShoppingCartOutlined } from "@ant-design/icons"
import { Button, Card, message } from "antd"
import Meta from "antd/lib/card/Meta"
import { useState } from "react"
import { useHistory } from "react-router"

import ProductModel from "../../../models/ProductModel"

import styles from './ProductCard.module.scss'

interface ProductCardProps {
    product: ProductModel
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
    const { product } = props
    const history = useHistory()
    const [isFavorited, setFavorite] = useState(false)

    const onFavorite = (event) => {
        event.stopPropagation()
        setFavorite(!isFavorited)
    }

    const onAddToCart = (event) => {
        event.stopPropagation()
        message.info('Item has been added to your cart.')
    }

    return (
        <div style={{ width: 300 }} onClick={() => history.push(`/products/${product.id}`)}>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        className={styles.card__image}
                        alt="example"
                        src={product.imageUrl}
                    />
                }
                actions={[
                    <Button
                        shape="circle"
                        key="purchase"
                        icon={<ShoppingCartOutlined />}
                        onClick={onAddToCart}
                    />,
                    <Button
                        shape="circle"
                        key="favorite"
                        icon={isFavorited
                            ? <HeartTwoTone twoToneColor="#eb2f96" />
                            : <HeartOutlined />
                        }
                        onClick={onFavorite}
                    />
                ]}
            >
                <Meta
                    title={product.title}
                    description={
                        <section className={styles.meta__section}>
                            <p>{product.description}</p>
                            <p className={styles.meta__section__price}>{product.price} </p>
                        </section>
                    }
                />
            </Card>
        </div>
    )
}

export default ProductCard