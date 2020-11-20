require('dotenv').config();

const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  return intercepter(req, res);
});

const intercepter = (req, res) => {
  if (req.url === '/')
    res.status(500).send('Invalid endpoint');

  const params = {
    url: process.env.API_URI + req.url,
    headers: {
      Authorization: req.headers.authorization,
    },
  };

  if (req.body && Object.keys(req.body).length)
    params.body = req.body

  request(params, (error, response, body) => {
      if (error || (response && response.statusCode >= 400)) {
        return res.status(response.statusCode).json({
          message: error && error.message ? error.message : '',
          statusCode: response.statusCode
        });
      }

      res.status(response.statusCode).json(JSON.parse(body));
    }
  )
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`mock api listening on ${PORT}`));
