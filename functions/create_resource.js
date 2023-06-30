const crypto = require("crypto");
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
}

exports.create = async (event) => {
  try {
    const { topic, link, resourceLevel } = JSON.parse(event.body);

    if (!topic || !link || !resourceLevel) {
      return sendResponse(400, null, "All three parameters are required!");
    }

    const resourceId = crypto.randomBytes(8).toString("hex");

    let mappedLevel = "Intermediate";
    if (resourceLevel === 1 || resourceLevel === 3) {
      mappedLevel = levelMapping[resourceLevel];
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        resourceId,
        topic,
        link,
        resourceLevel: mappedLevel,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    await dynamoDB.put(params).promise();
    return sendResponse(201, params.Item, "Resource created successfully");
  } catch (error) {
    console.log(error);
    return sendResponse(500, error, "Error");
  }
};