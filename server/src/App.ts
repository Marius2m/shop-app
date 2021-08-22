import express from 'express'
import { ConnectToDB } from './middlewares/DBConnection'

const app = express()

// Session Start
app.use(ConnectToDB({
	user: process.env.NEO4J_USER,
	pass: process.env.NEO4J_PASS,
	url: process.env.NEO4J_URL,
}))

// Paths
app.use('/health', (req, res, next) => res.json({ ams: ':)' }))

export default app