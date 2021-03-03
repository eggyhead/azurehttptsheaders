import { AzureFunction, Context, HttpRequest } from '@azure/functions';

export const coldShoulder: AzureFunction = async function (context: Context, req: HttpRequest) {
  context.log('Typescript HTTP trigger function processed a request.');
  const {headers} = req.headers

  if (req.query.name || (req.body?.name)) {
    context.res = {
      status: 200,
      body: `I can't say hello because I don't have a head, ${(req.query.name || req.body.name)}!`,
      headers: headers,
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body',
      headers: headers
    };
  }
};

