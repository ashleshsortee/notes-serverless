// export default function handler(lambda) {
//   return function (event, context) {
//     return Promise.resolve()
//       // Run the ambda
//       .then(() => lambda(event, context))
//       // On success
//       .then((responseBody) => [200, responseBody])
//       // On failure
//       .catch((e) => {
//         return [500, { error: e.message }];
//       })
//       // Return HTTP response
//       .then(([statusCode, body]) => ({
//         statusCode,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Credentials": true,
//         },
//         body: JSON.stringify(body),
//       }));
//   };
// }

export default function handler(lambda) {
  return async function (event, context) {
    try {
      const responseBody = await lambda(event, context);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(responseBody),
      };
    } catch (e) {
      return [500, { error: e.message }];
    }
  };
}