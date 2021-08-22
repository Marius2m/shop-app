const { app } = require('./App')

const port = 4000

app.listen(port, () => console.log(`
============================================
Server started and is listening on port ${port}
============================================
`))
