module.exports = ({ test, functions, context }) => {
  test('functions.setDependencies', (t) => {
    functions.setDependencies();
    t.pass();
  });

  test('functions.injectDependenciesOn', (t) => {
    functions.injectDependenciesOn();
    t.pass();
  });

  test('functions.construct', (t) => {
    functions.construct(context.Clazz, context.registries);
    t.pass();
  });

  test('functions.defineHiddenProperty', (t) => {
    functions.defineHiddenProperty();
    t.pass();
  });

  test('functions.callIfFunction', (t) => {
    functions.callIfFunction();
    t.pass();
  });
};
