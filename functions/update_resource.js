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

exports.update = async (event) => {
  try {
    const { resourceId, topic, link, resourceLevel } = JSON.parse(event.body);

    if (!resourceId || !topic || !link || !resourceLevel) {
      return sendResponse(400, null, "All three parameters are required!");
    }

    // check if resourceId is valid and exists in the table
    const getParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        resourceId,
      },
    };
    const isValid = await dynamoDB.get(getParams).promise();
    if (!isValid.Item) {
      return sendResponse(400, null, "Invalid resourceId!");
    }

    let mappedLevel = "Intermediate";
    if (resourceLevel === 1 || resourceLevel === 3) {
      mappedLevel = levelMapping[resourceLevel];
    }

    let updatedAt = new Date().toISOString();

    const updateParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        resourceId,
      },
      UpdateExpression: "set topic = :topic, link = :link, resourceLevel = :resourceLevel, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":topic": topic,
        ":link": link,
        ":resourceLevel": mappedLevel,
        ":updatedAt": updatedAt,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const res = await dynamoDB.update(updateParams).promise();
    return sendResponse(200, res.Attributes, "Resource updated successfully!");
  } catch (error) {
    console.log(error);
    return sendResponse(500, error, "error!");
  }
};
