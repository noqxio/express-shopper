import * as AWS from '@aws-sdk/client-dynamodb'
import dotenv from 'dotenv'
dotenv.config()

var params = {
  TableName: process.argv[2]
}

const ddb = new AWS.DynamoDB({ region: 'LOCAL', endpoint: 'http://localhost:8000' })

// Call DynamoDB to delete the specified table
ddb.deleteTable(params, function (err, data) {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log('Error: Table not found')
  } else if (err && err.code === 'ResourceInUseException') {
    console.log('Error: Table in use')
  } else {
    console.log('Success', data)
  }
})
