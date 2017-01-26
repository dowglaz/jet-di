let registerGlobalDeps;
let setupDeps;

module.exports = class Context {
  constructor(require, pkg, lodash) {
    this.require = require;
    this.pkg = pkg;
    this._ = lodash;
    registerGlobalDeps(this);
    this.deps = setupDeps(this);
  }

  static runLocally(readPkgUp, lodash) {
    const localPkg = readPkgUp.sync().pkg;
    return require => new Context(require, localPkg, lodash);
  }

  subContext() {
    return this._.cloneDeep(this);
  }

  register(name, dep) {
    if (typeof name === 'string') {
      this.deps[name] = this.injectOn(dep);
    } else {
      this.injectOn(name);
    }
    return dep;
  }

  registerModule(name, module) {
    this.deps[name] = module;
    return module;
  }

  get(name) {
    return this.deps[name];
  }

  injectOn(target) {
    if (!this.deps) return target;

    Object
      .keys(this.deps)
      .forEach((dep) => {
        Object.defineProperty(target, dep, {
          value: this.deps[dep],
          configurable: false,
          enumerable: false,
          writable: false,
        });
      });

    return target;
  }
};

// "Private" scope

registerGlobalDeps = (context) => {
  const globalDepMap = context.pkg.globalDepMap;

  if (!globalDepMap) return context;

  Object
    .keys(globalDepMap)
    .forEach((dep) => {
      global[context.pkg.globalDepMap[dep]] = context.require(dep);
    });

  return context;
};

setupDeps = (context) => {
  const deps = {};

  if (!context && !context.pkg && !context.pkg.dependencies) return deps;

  Object
    .keys(context.pkg.dependencies)
    .forEach((depName) => {
      const alias = context._(context.pkg).get(`depMap.${depName}`);
      deps[alias || depName] = context.require(depName);
    });

  return deps;
};
