// import package
const express = require('express');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const compression = require("compression");
const session = require('express-session');
// import config
const passport = require('./config/configPassport');
const configSession = require('./config/configSession');
// import route
const indexRoutes = require('./routes/index');

const app = express();
const port = 5000;

moment.tz.setDefault('Asia/Makassar');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
