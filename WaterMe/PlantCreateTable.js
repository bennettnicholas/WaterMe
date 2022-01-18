var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  endpoint: "https://dynamodb.us-west-1.amazonaws.com",
  accessKeyId: "AKIAZSH2QQD6EN2PWFDP",
  secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Plants",
    KeySchema: [       
        { AttributeName: "plantname", KeyType: "HASH"},  //Partition key
        { AttributeName: "moistureLevel", KeyType: "HASH" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "plantname", AttributeType: "S" },
        { AttributeName: "moistureLevel", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 100, 
        WriteCapacityUnits: 100
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
