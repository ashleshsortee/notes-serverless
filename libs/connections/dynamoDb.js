import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: 'something',
    secretAccessKey: 'something',
    region: 'us-east-1',
    logger: process.stdout
});

const client = new AWS.DynamoDB.DocumentClient({ endpoint: 'http://localhost::4563' });

export default {
    get: (params) => client.get(params).promise(),
    put: (params) => client.put(params).promise(),
    query: (params) => client.query(params).promise(),
    update: (params) => client.update(params).promise(),
    delete: (params) => client.delete(params).promise(),
};
