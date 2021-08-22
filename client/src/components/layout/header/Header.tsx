import React from 'react'
import { Menu, Input } from 'antd'
import { ShopOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'

import styles from './Header.module.scss'

const { Search } = Input;

const Header: React.VoidFunctionComponent = () => {
    let history = useHistory()

    const onSearch = (value: string) => {
        if (value.length > 0) {
            history.push(`/search?term=${value}`)
        }
    }

    const onHomeClick = () => {
        history.push(`/`)
    }

    return (
        <div className={styles.header}>
            <span onClick={onHomeClick}>
                <ShopOutlined className={styles.header__logo}/>
            </span>

            <Search className={styles.header__search} placeholder="search product" onSearch={onSearch} enterButton />

            <Menu className={styles.header__menu} theme="dark" mode="horizontal">
                <Menu.Item key={'Home'}><Link to='/'>Home</Link></Menu.Item>
                <Menu.Item key={'Products'}><Link to='/products'>Products</Link></Menu.Item>
                <Menu.Item key={'Favorites'}><Link to='/favorites'>Favorites</Link></Menu.Item>
            </Menu>
        </div>
    )
}

export default Header