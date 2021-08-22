const express = require('express')

const app = express()

app.use('/health', (req, res, next) => res.json({ ams: ':)' }))

module.exports = {
    app
}