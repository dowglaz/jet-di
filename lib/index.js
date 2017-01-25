const readPkgUp = require('read-pkg-up'),
      lodash = require('lodash'),
      Context = require('./Context');

module.exports = Context.runLocally(readPkgUp, lodash);
