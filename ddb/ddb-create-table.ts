import * as AWS from '@aws-sdk/client-dynamodb'
import dotenv from 'dotenv'
dotenv.config()

const ddb = new AWS.DynamoDB({ region: 'LOCAL', endpoint: 'http://localhost:8000' })

const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'PRODUCT_ID',
      AttributeType: 'N'
    },
    {
      AttributeName: 'PRODUCT_NAME',
      AttributeType: 'S'
    },
    {
      AttributeName: 'PRODUCT_PRICE',
      AttributeType: 'N'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'PRODUCT_ID',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'PRODUCT_NAME',
      KeyType: 'RANGE'
    }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: 'PRICE_SUPPORT_INDEX',
      KeySchema: [
        { AttributeName: 'PRODUCT_ID', KeyType: 'HASH' },
        { AttributeName: 'PRODUCT_PRICE', KeyType: 'RANGE' }
      ],
      Projection: {
        ProjectionType: 'ALL'
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'PRODUCTS',
  StreamSpecification: {
    StreamEnabled: false
  }
}

ddb.createTable(params, function (err?: any, data?: AWS.CreateTableCommandOutput | undefined) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Table Created', data)
  }
})
