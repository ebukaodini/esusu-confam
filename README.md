# ESUSU CONFAM
Esusu Confam Ltd, a long-running Co-operative in Nigeria



## Setup
To setup this project, create a `.env` file and copy the code below into the file.

```.env
PORT=3000
TOKEN_SECRET=<generated-token-secret>

MONGODB_CONNECTION_URL=<mongodb-connection-url>
MONGODB_CONNECTION_URL_TEST=<mongodb-connection-test-url>
```
Create a MongoDB Cluster and add replace `<mongodb-connection-url>` & `<mongodb-connection-test-url>` with the actual connection url. Make sure the database name is included in the url.

To generate the TOKEN_SECRET, run the following commands below
```bash
$ node i
```
then
```bash
> require('crypto').randomBytes(64).toString('hex')
```

Replace <generated-token-secret> with the hexa-decimal output from the command above.


## Test
```bash
$ npm run test
```


## Run
```bash
$ npm start
```


## API Documentation
https://documenter.getpostman.com/view/6884204/UyxoijAT