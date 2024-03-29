import 'reflect-metadata'
import 'dotenv/config'
import { pagination } from 'typeorm-pagination'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import { errors } from 'celebrate'
const app = express()
import uploadConfig from 'config/upload'

// Middleware errors

// Conection Typeorm
import '../typeorm'
import { AppError } from 'shared/errors/AppError'
import rateLimiter from 'shared/middlewares/rateLimiter'

app.use(cors())
app.use(express.json())
// app.use(rateLimiter)
app.use(pagination)

app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
