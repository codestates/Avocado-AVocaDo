const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 4000;

let corsOpt = {
  origin: '*',
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOpt));
app.use(
  session({
    secret: 'A!VocaDo!',
    resave: false,
    saveUninitialized: true,
  })
);

const root = '';

app.get(root, (req, res) => {
  res.status(200).send('Success');
});

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;
