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

const levelMapping = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

exports.level = async (event) => {
  try {
    const { level } = event.queryStringParameters || {};

    if (!level) {
      return sendResponse(400, null, "level is required!");
    }

    let mappedLevel = "Intermediate";
    if (level == 1 || level == 3) {
      mappedLevel = levelMapping[level];
    }
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      IndexName: "resourceLevel-index",
      KeyConditionExpression: "resourceLevel=:resourceLevel",
      ExpressionAttributeValues: {
        ":resourceLevel": mappedLevel,
      },
    };
    const response = await dynamoDB.query(params).promise();
    return sendResponse(200, response.Items, "Resource listed successfully!");
  } catch (error) {
    console.log(error);
    return sendResponse(500, error, "error!");
  }
};
