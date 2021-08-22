import express from 'express'

const app = express()

app.use('/health', (req, res, next) => res.json({ ams: ':)' }))

export default app