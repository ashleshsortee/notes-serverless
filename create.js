import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/connections/dynamoDb";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDb.put(params);
    } catch (error) {
        throw Error(`Error while inserting record in dynamoDB - ${error}`);
    }

    return params.Item;
});
