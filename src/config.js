export default {
    s3: {
      REGION: "us-east-1",
      BUCKET: "sls-online-test-public"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL1:' http://localhost:3000/dev',
      URL: "https://iwhka55e27.execute-api.us-east-1.amazonaws.com/dev",
      MailURL:''
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_2qSMDdMNu",
      APP_CLIENT_ID: "2c77dfhjgk2v9grrsa7jnnksvd",
      IDENTITY_POOL_ID: "us-east-1:7411fb38-f0d1-4a44-8f51-c9dcd321f1c1"
    },
    MAX_ATTACHMENT_SIZE:1000000
  };
