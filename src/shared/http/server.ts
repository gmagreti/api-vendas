import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './routes'
const app = express()

// Middleware errors

// Conection Typeorm
import '../typeorm'
import { AppError } from 'shared/errors/AppError'

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
