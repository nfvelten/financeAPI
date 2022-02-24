import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './routes'
import { errorHandler, rateLimiter } from './middlewares'
import uploadConfig from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json())
app.use(rateLimiter)

app.use('/avatar', express.static(`${uploadConfig.directory}/avatar`))

app.use('/cap', routes)

app.use(errorHandler)

export { app }
