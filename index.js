const express = require('express');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const passport = require('./config/configPassport');
const session = require('express-session');
const canAccess = require('./middleware/rbac');
const configSession = require('./config/configSession');
const { ensureAuthenticated } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const compression = require("compression");

const app = express();
const port = 3000;

moment.tz.setDefault('Asia/Makassar');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.get('/api/dashboard', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'dashboard', permission: 'read' };
  canAccess(req, res, next);
}, (req, res) => {
  res.json({ message: 'Dashboard menu' });
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
