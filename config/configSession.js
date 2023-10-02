const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const configdb = require('./database');

// Definisikan model untuk sesi
const Session = configdb.define('Session', {
  sid: {
    type: configdb.Sequelize.STRING,
    primaryKey: true,
  },
  expires: configdb.Sequelize.DATE,
  data: configdb.Sequelize.TEXT,
});

Session.sync();

const configSession = {
  secret: 'yusuf-kun',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: configdb,
    table: 'Session',
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }),
};

module.exports = configSession;
