const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const wordRouter = require('./routes/words');
const cors = require('cors');

const app = express();
const port = 8080;

let corsOpt = {
  origin: [
    'http://localhost:3000',
    'http://avocado-client-react.s3-website.ap-northeast-2.amazonaws.com',
  ],
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOpt));
app.use(
  session({
    secret: 'A!VocaDo!',
    resave: false,
    cookie: { maxAge: 3600000 },
    rolling: true,
    // cookie: { maxAge: 10000 },
    saveUninitialized: true,
  })
);
app.use(cookieParser());

const root = '/';

app.post(root, (req, res) => {
  if (req.session.userId) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.use('/users', userRouter);
app.use('/words', wordRouter);

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;
