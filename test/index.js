const jetDi = require('../');
const test = require('ava').test;

const Registry = require('../lib/Registry');

const functions = require('../lib/functions');
const functionsTests = require('./lib/functions');
const functionsContext = require('./lib/contexts/functions')(Registry);

functionsTests({ test, functions, functionsContext });

test('jet-di', (t) => {
  jetDi(require);
  t.pass();
});
