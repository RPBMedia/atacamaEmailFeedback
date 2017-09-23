if (process.env.NODE_ENV === 'production')  {
  //we are in prod. return the production keys
  module.exports = require('./prod');
} else {
  //return the dev keys
  module.exports = require('./dev');
}
