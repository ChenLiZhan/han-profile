var home = require('./home');

module.exports = function(app) {
  app.get('/', home.index);
  app.use('/api/v1/', require('./api'));
  app.get('*', home.index);
};