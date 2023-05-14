import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { getProducts } from './handlers/products/get-products'
import { postProducts } from './handlers/products/post-products'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Shopper Server')
})

app.get('/products', getProducts)

app.post('/products', postProducts)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
