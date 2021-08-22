import express from 'express'

import * as SearchController from '~/controllers/SearchController'

const router = express.Router()

// /search
router.get(
    '/',
    SearchController.getAll
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
    (_, res) => res.status(501).send('Not implemented')
)

export default router
