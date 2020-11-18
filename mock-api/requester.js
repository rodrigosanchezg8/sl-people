require('dotenv').config();

const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.all('*', (req, res) => intercepter(req, res));

const intercepter = (req, res) => {
  if (req.url === '/')
    res.status(500).send('Invalid endpoint');

  const params = {
    url: process.env.API_URI + req.url,
    headers: {
      Authorization: req.headers.authorization,
    },
  };

  if (req.body && req.body.length)
    params.body = req.body

  request(params, (error, response, body) => {
      if (error || response.statusCode !== 200)
        return res.status(500).json({message: error ? error.message : 'Invalid endpoint'});

      res.json(JSON.parse(body));
    }
  )
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`mock api listening on ${PORT}`));
