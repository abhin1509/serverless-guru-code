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

exports.delete = async (event) => {
  try {
    const { resourceId } = JSON.parse(event.body);

    if (!resourceId) {
      return sendResponse(400, null, "resourceId is required!");
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        resourceId,
      },
    };

    // check if resourceId is valid and exists in the table
    const isValid = await dynamoDB.get(params).promise();
    if (!isValid.Item) {
      return sendResponse(400, null, "Invalid resourceId!");
    }

    await dynamoDB.delete(params).promise();
    return sendResponse(200, params.Key, "Resource deleted successfully!");
  } catch (error) {}
};
