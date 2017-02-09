const setDependencies = (dependencies, depMap = {}) => ({
  on(registry) {
    return {
      using(localRequire) {
        Object.keys(dependencies).forEach((depName) => {
          const key = depMap[depName] || depName;
          registry.set({ [key]: localRequire(depName) });
        });

        return registry;
      },
    };
  },
});

const injectDependenciesOn = (object, dependsOn) => ({
  from: (...registries) => {
    registries.forEach((registry) => {
      registry.iterate((dependency) => {
        defineHiddenProperty(object, dependency, registry.getBy(dependency));
      }, dependsOn);
    });
  },
});

const construct = (Clazz, ...registries) => {
  const object = Object.create(Clazz.prototype);
  injectDependenciesOn(object, Clazz.dependsOn())
        .from(registries);
  object['initialize'].call(object);
  return object;
};

const defineHiddenProperty = (target, dep, value) => {
  Object.defineProperty(target, dep, {
    value,
    configurable: false,
    enumerable: false,
    writable: false,
  });
};

const callIfFunction = subject =>
  (subject && typeof subject === 'function' ? subject() : []);

module.exports = {
  setDependencies,
  injectDependenciesOn,
  construct,
  defineHiddenProperty,
  callIfFunction,
};
