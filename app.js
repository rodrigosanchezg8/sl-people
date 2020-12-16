const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist/sl-people')));

app.get('*', function (request, response, next) {
  if (request.url.startsWith('/assets')) return next();
  return response.sendFile(path.join(__dirname, 'dist/sl-people/index.html'));
});

const port = 3001;
http.createServer(app).listen(port, '0.0.0.0', () => {
  console.log(`Listening at port ${port}`);
});



