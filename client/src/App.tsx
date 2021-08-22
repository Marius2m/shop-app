import './App.css';

import { FC } from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import styles from './App.module.scss'

const App: FC = () => {

  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

const { Content, Footer } = Layout;

const AppLayout = () => {

  return (
    <Layout>
      Header
      <Content className={styles.layout__content}>
        <Switch>
          <Route path='/' exact > Home </Route>
          <Route path='/products' exact> Products </Route>
          <Route path='/products/:id'> Pooducts::Id</Route>
          <Route path='/search'> Search </Route>
          <Route path='/favorites'> Favorites </Route>
        </Switch>
      </Content>
      <Footer className={styles.layout__footer} style={{ textAlign: 'center' }}>
        Shop - Created by MM
      </Footer>
    </Layout>
  )
}

export default App;
