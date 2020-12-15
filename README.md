# SLPeople

This project uses the SL API people information and features all levels of the document plus some added features.

## Table of contents

### Build

For production, simply run `node app` and `ng build -c production`, whereas for development you only need to use `ng serve`.
You need to also run the proxy layer accessing the mock-api folder and running `node requester`.

## Environment

The project must include both files environments.ts and environment.prod.ts file within the environments folder.
Please note that `ng build` or `ng serve` will use the first and `ng build -c production` will use the later.

````
export const environment = {
  production: true, 
  apiURI: 'myAPIURI', // The API URI needs to point to our requester app address.
  apiKey: 'myAPIKey'
};
````

## Proxy layer

A script was made to bypass the CORS issue that comes when fetching from the SL API. It simply modifies
the `Access-Control-Allow-Origin` header of the incoming request needs to be modified with value `*`.
In order to do so, a `proxy` layer between the front-end and the API was added, and can be run by accessing the mock-api folder
and running `node requester`. 

In this folder a .env is necessary to be present and have the following variables.

````
API_URI= // SL API URI
NODE_TLS_REJECT_UNAUTHORIZED=0 // Workaround for npm in case you are behind a proxy or protection.
PORT=3000 // Port in which the API will run
````

## Modules, components & services notes

Please note that each component is used to only present information, hence, services work for HTTP 
requests or for a larger logic that can be separated.

## Content

- [x] Level 1 - Fetch
- [x] Level 2 - Frequency count
- [x] Level 3 - Duplicated





