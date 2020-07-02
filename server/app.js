const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const cors = require('cors');

const app = express();
const port = 8080;

let corsOpt = {
  origin: 'http://127.0.0.1:3000',
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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const root = '/';

app.get(root, (req, res) => {
  res.status(200).send('Success');
});

app.use('/user', userRouter);

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;
