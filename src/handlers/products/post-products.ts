import * as AWS from '@aws-sdk/client-dynamodb'
import { Request, Response } from 'express'

const ddb = new AWS.DynamoDB({
  region: 'LOCAL',
  endpoint: 'http://localhost:8000',
  apiVersion: '2012-08-10'
})

export const postProducts = async (req: Request, res: Response) => {
  const { id, name, price } = req.body
  const params = {
    TableName: 'PRODUCTS',
    Item: {
      PRODUCT_ID: { N: id },
      PRODUCT_NAME: { S: name },
      PRODUCT_PRICE: { N: price }
    }
  }
  ddb.putItem(params, function (err: any, data?: AWS.PutItemCommandOutput) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success', data)
    }
  })

  res.send('OK')
}
