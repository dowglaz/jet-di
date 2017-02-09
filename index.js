const cloneDeep = require('lodash/cloneDeep');
const pick = require('lodash/pick');
const readPkgUp = require('read-pkg-up');

const Context = require('./lib/Context');
const Registry = require('./lib/Registry');
const functions = require('./lib/functions');
const setupContext = require('./lib/setupContext');

const localRegistry = new Registry();
const externalRegistry = new Registry();
const globalRegistry = new Registry(global);

const packageConfigs = pick(
  readPkgUp.sync().pkg, 'dependencies', 'depMap', 'globalDependencies');

module.exports = localRequire => (
  setupContext({
    Context,
    localRequire,
    localRegistry,
    externalRegistry,
    globalRegistry,
    packageConfigs,
    functions,
    cloneDeep,
  })
);
