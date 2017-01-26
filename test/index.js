const jetDi = require('../lib');
const test = require('ava').test;

test('jet-di', (t) => {
  jetDi(require);
  t.pass();
});
