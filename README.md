## Serverless Guru Code

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/abhin1509/serverless-guru-code/deploy_app.yml)

### Hosted API Endpoints

###### Create a resource `POST`
```
https://q6fd19f92j.execute-api.us-east-1.amazonaws.com/dev/add
```
- Sample request body
```
{
    "topic": "serverless intro",
    "link": "https://youtube.com",
    "resourceLevel": 1
}
```
###### Get all resources `GET`
```
https://q6fd19f92j.execute-api.us-east-1.amazonaws.com/dev/list
```
###### Delete a resource `DELETE`
```
https://q6fd19f92j.execute-api.us-east-1.amazonaws.com/dev/delete
```
- Sample request body
```
{
    "resourceId": "resource-id"
}
```
###### Update a resource `PUT`
```
https://q6fd19f92j.execute-api.us-east-1.amazonaws.com/dev/update
```
- Sample request body
```
{
    "resourceId": "2c86b9f2142dk2339",
    "topic": "serverless updated intro",
    "link": "https://youtube.com",
    "resourceLevel": 3
}
```
###### Get resource by level `GET`
```
https://q6fd19f92j.execute-api.us-east-1.amazonaws.com/dev/resourceLevel?level=1
```


### Instructions

1. Clone the repo

```
git clone https://github.com/abhin1509/serverless-guru-code.git
```

2. Go to the clonned directory

```
cd serverless-guru-code
```
3. Install Serverless Framework

```
npm install -g serverless
```

4. Install dependencies
```
npm install
```
5. Run test
```
npm test
```
6. Deploy the app (This app supports multistage deployment)
- Run below command to deploy app to `dev environment`
```
sls deploy --stage dev
```
- Run below command to deploy app to `prod environment`
```
sls deploy --stage prod
```

### Screenshots

- CI/CD deployment for `dev` enviroment.

![Dev Env](./screenshots/devDeployment.png)


- CI/CD deployment for `prod` environment.

![Prod Env](./screenshots/prodDeployment.png)

- Test Case

![Test Case](./screenshots/testCase.png)

### Tech Stack:
- Serverless Framework
- Github Actions
- API Gateway
- DynamoDB
- Postman
- Lambda
- Nodejs
- Jest
