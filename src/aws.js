const awsSdk = require('aws-sdk');

class Aws {
  constructor() {
    awsSdk.config.update({
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-east-1'
    });
  }

  createTable() {
    const dynamodb = new awsSdk.DynamoDB();
    const params = {
      TableName: 'order',
      KeySchema: [
        { AttributeName: "year", KeyType: "HASH" },  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };
    return new Promise((resolve, reject) => {
      dynamodb.createTable(params, function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  dynamoPut() {
    const docClient = new awsSdk.DynamoDB.DocumentClient();

    const params = {
      TableName: 'orders',
      Item: {
        orderId: '0005',
        first_name: 'Analu2'
      },
      ReturnValues: 'ALL_OLD'
    };

    return new Promise((resolve, reject) => {
      docClient.put(params, function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }

  dynamoGet() {
    const docClient = new awsSdk.DynamoDB.DocumentClient();

    const params = {
      TableName: 'orders',
      Key: {
        orderId: '0001'
      }
    };

    return new Promise((resolve, reject) => {
      docClient.get(params, function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  
  }

  dynamoUpdate() {
    const docClient = new awsSdk.DynamoDB.DocumentClient();

    const params = {
      TableName: 'orders',
      Key: {
        orderId: '0001'
      },
      UpdateExpression: 'set first_name=:fn',
      ExpressionAttributeValues: {
        ":fn": 'TavoGus 2'
      },
      ReturnValues: 'UPDATED_NEW'
    };

    return new Promise((resolve, reject) => {
      docClient.update(params, function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }

  dynamoDelete() {
    const docClient = new awsSdk.DynamoDB.DocumentClient();

    const params = {
      TableName: 'orders',
      Key: {
        orderId: '0005'
      },
      ConditionExpression: 'first_name=:fn',
      ExpressionAttributeValues: {
        ":fn": 'Analu2'
      }
    };

    return new Promise((resolve, reject) => {
      docClient.delete(params, function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }

  dynamoQuery() {
    const docClient = new awsSdk.DynamoDB.DocumentClient();

    const params = {
      TableName: 'orders',
      ProjectionExpression: "#o", // select
      KeyConditionExpression: "#o=:o",
      ExpressionAttributeNames: {
        "#o": "orderId",
      },
      ExpressionAttributeValues: {
        ":o": '0004',
      }
    };

    return new Promise((resolve, reject) => {
      docClient.query(params, function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }

  dynamoScan() {
    const docClient = new awsSdk.DynamoDB.DocumentClient();

    const params = {
      TableName: 'orders',
      ProjectionExpression: "#o, first_name", // select
      FilterExpression: "#o=:o and #fn=:fn",
      ExpressionAttributeNames: {
        "#o": "orderId",
        "#fn": "first_name",
      },
      ExpressionAttributeValues: {
        ":o": '0004',
        ":fn": 'Analu',
      }
    };

    return new Promise((resolve, reject) => {
      docClient.scan(params, function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }

}

module.exports = Aws;