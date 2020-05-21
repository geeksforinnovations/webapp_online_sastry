export default {
    s3: {
      REGION: "us-east-1",
      BUCKET: "sls-online-test-public"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL:"https://t5xovlkc3f.execute-api.us-east-1.amazonaws.com/dev",
      // URL: "https://czla69q7ql.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_coVPXKLPD",
      APP_CLIENT_ID: "4roh06r403pci87qfo0j6ipuks",
      IDENTITY_POOL_ID: "us-east-1:f59389b7-b99d-4da9-95b8-185eb0353608"
    },
    MAX_ATTACHMENT_SIZE:1000000
  };