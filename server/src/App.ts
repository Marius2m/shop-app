import express from 'express'
import compression from 'compression'
import ProductRoutes from '~/routes/ProductRoutes'
import { ConnectToDB } from './middlewares/DBConnection'
import { logger } from './config/logger'
import { NotFoundError } from './utils/Errors'

const app = express()

// Session Start
app.use(compression())
app.use(ConnectToDB({
	user: process.env.NEO4J_USER,
	pass: process.env.NEO4J_PASS,
	url: process.env.NEO4J_URL,
}))

// Paths
app.use('/health', (req, res, next) => res.json({ ams: ':)' }))
app.use('/products', ProductRoutes)

// Session End
// app.use(CloseDBConnection)
app.use((err, req, res, next) => {
	if (err) logger.error('Err', err)

	if (err instanceof NotFoundError) {
		res.status(404).json({ message: err.message })
	} else {
		res.status(500).json({ message: err.message })
	}
	next()
})

export default app