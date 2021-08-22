import express from 'express'

import * as ProductsController from '~/controllers/ProductsController'

const router = express.Router()

// /products
router.get(
    '/',
    ProductsController.getAll
)
router.post(
    '/',
    (_, res) => res.status(501).send('Not implemented')
)
router.patch(
    '/',
    (_, res) => res.status(501).send('Not implemented')
)
router.delete(
    '/',
    (_, res) => res.status(405).send('Not allowed')
)

// /products/:id
router.get(
    '/:id',
    (_, res) => res.status(501).send('Not implemented')
)
router.post(
    '/:id',
    (_, res) => res.status(501).send('Not implemented')
)
router.patch(
    '/:id',
    (_, res) => res.status(501).send('Not implemented')
)
router.delete(
    '/:id',
    (_, res) => res.status(501).send('Not implemented')
)

export default router
