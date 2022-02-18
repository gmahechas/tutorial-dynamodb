const AWS = require('./aws');

const index = async () => {
  const aws = new AWS();
  // const result = await aws.createTable();
  // const result = await aws.dynamoPut();
  // const result = await aws.dynamoGet();
  // const result = await aws.dynamoUpdate();
  // const result = await aws.dynamoDelete();
  // const result = await aws.dynamoQuery();
  const result = await aws.dynamoScan();
  console.log(result);
};

index();