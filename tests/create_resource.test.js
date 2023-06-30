const { create } = require("../functions/create_resource");
const aws = require("aws-sdk");

jest.mock("process", () => ({
  env: {
    DYNAMODB_TABLE: "ServerlessResources-dev-table",
  },
}));

const requestBody = {
  resourceId: "32133ac67409486e",
  topic: "serverless updated intro",
  link: "https://youtube.com",
  resourceLevel: "Intermediate",
};

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        put: jest.fn().mockReturnThis(),
        promise: jest.fn(),
      })),
    },
  };
});

describe("create", () => {
  test("should create a resource", async () => {
    const mockedDb = new aws.DynamoDB.DocumentClient();
    mockedDb.put().promise.mockResolvedValueOnce({ Items: requestBody });

    const mockEvent = {
      body: JSON.stringify(requestBody),
    };

    const response = await create(mockEvent);
    expect(response.statusCode).toEqual(201);
    expect(JSON.parse(response.body)).toStrictEqual({
      data: {
        createdAt: expect.any(String),
        link: "https://youtube.com",
        resourceId: expect.any(String),
        resourceLevel: "Intermediate",
        topic: "serverless updated intro",
        updatedAt: expect.any(String),
      },
      message: "Resource created successfully",
    });
  });
});