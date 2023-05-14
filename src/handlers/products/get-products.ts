import * as AWS from '@aws-sdk/client-dynamodb'
import { ScanCommandInput } from '@aws-sdk/client-dynamodb'
import { Request, Response } from 'express'

const ddb = new AWS.DynamoDB({
  region: 'LOCAL',
  endpoint: 'http://localhost:8000',
  apiVersion: '2012-08-10'
})

export interface Product {
  id?: number
  name?: string
  price?: number
}

export const getProducts = async (req: Request, res: Response) => {
  const params: ScanCommandInput = {
    TableName: 'PRODUCTS'
  }

  const products: Product[] = []
  let items
  do {
    items = await ddb.scan(params)
    if (items && items.Items) {
      items.Items.forEach((item) => products.push(item))
    }
    params.ExclusiveStartKey = items.LastEvaluatedKey
  } while (typeof items.LastEvaluatedKey !== 'undefined')

  res.send(products)
}
