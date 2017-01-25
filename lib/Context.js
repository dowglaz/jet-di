class Context {
  constructor(require, pkg, lodash) {
    this.require = require;
    this.pkg = pkg;
    this._ = lodash;
    this._registerGlobalDeps();
    this.deps = this._setupDeps();
  }

  static runLocally(readPkgUp, lodash) {
    let localPkg = readPkgUp.sync().pkg;

    return function(require) {
      return new Context(require, localPkg, lodash);
    };
  }

  subContext() {
    return this._.cloneDeep(this);
  }

  register(name, dep) {
    if(typeof name === 'string') {
      this.deps[name] = this.injectOn(dep);
    } else {
      dep = name;
      this.injectOn(dep);
    }
    return dep;
  }

  registerModule(name, module) {
    return this.deps[name] = module;
  }

  get(name) {
    return this.deps[name];
  }

  injectOn(target) {
    for(let dep in this.deps) {
      target[dep] = this.deps[dep];
    }
    return target;
  }

  _registerGlobalDeps() {
    for(let dep in this.pkg.globalDepMap) {
      global[this.pkg.globalDepMap[dep]] = this.require(dep);
    }
    return this;
  }

  _setupDeps() {
    let pkgDeps = this._.keys(this.pkg.dependencies),
        deps = {};
    for(let depName of pkgDeps) {
      let alias = this._(this.pkg).get(`depMap.${depName}`);
      deps[alias || depName] = this.require(depName);
    }
    return deps;
  }
};

module.exports = Context;
