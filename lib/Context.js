module.exports = class Context {
  static dependsOn() {
    return [
      'externalRegistry',
      'localRegistry',
      'construct',
      'cloneDeep',
    ];
  }

  initialize() {}

  registerNew(Clazz) {
    const object = this.construct(Clazz)
          .from(this.localRegistry, this.externalRegistry);
    return this.register({
      [Clazz.name[0].toLowerCase() + Clazz.name.substring(1)]: object,
    });
  }

  register(entry) {
    return this.localRegistry.set(entry);
  }

  get(name) {
    return this.localRegistry.getBy(name);
  }

  registerModule(entry) {
    this.localRegistry.set(entry);
    return module;
  }

  createSubContext() {
    return this.cloneDeep(this);
  }
};
