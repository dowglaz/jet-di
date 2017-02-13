// External dependencies
const cloneDeep = require('lodash/cloneDeep');
const pick = require('lodash/pick');
const readPkgUp = require('read-pkg-up');

// Local dependencies
const Registry = require('./lib/Registry');
const Context = require('./lib/Context');
const functions = require('./lib/functions');
const setupContext = require('./lib/setupContext');

// Local instantiations
const externalRegistry = new Registry();
const localRegistry = new Registry();
const globalRegistry = new Registry(global);

const packageConfigs = pick(
  readPkgUp.sync().pkg, 'dependencies', 'depMap', 'globalDependencies');

/**
 * Exposes a function that needs the local (user) require to work.
 * It uses the local require function to load local project's external
 * and local dependencies into the indicated local classes.
 */
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
