const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const sendResponse = (code, items, message) => {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ data: items, message }),
  };
};

exports.list = async (event) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
    };

    const res = await dynamoDB.scan(params).promise();
    return sendResponse(200, res.Items, "Resource listed successfully!");
  } catch (error) {
    console.log(error);
    return sendResponse(500, error, "error!");
  }
};
