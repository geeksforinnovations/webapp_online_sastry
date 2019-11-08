export default {
    s3: {
      REGION: "us-east-1",
      BUCKET: "serverless-online-sastry1-dev-attachmentsbucket-10n34s2yglpqf"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://e93ownwzgl.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_zBrNlhRBj",
      APP_CLIENT_ID: "3jauhb0h6nd26m5h5b5mdilo5i",
      IDENTITY_POOL_ID: "us-east-1:8f49db36-1df1-478e-9961-8fedcd0a9358"
    },
    MAX_ATTACHMENT_SIZE:1000000
  };