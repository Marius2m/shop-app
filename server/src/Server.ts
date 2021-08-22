import * as dotenv from 'dotenv'
dotenv.config()

import app from './App'
import { logger } from './config/logger'

const port = 4000

app.listen(port, () => logger.info(`
============================================
Server started and is listening on port ${port}
============================================
`))
