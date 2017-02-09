module.exports = class Registry {
  constructor(base = {}) {
    Object.defineProperty(this, 'registry', { value: base });
  }

  set(entry) {
    const key = Object.keys(entry)[0];
    const value = entry[key];

    if (this.registry[key]) {
      throw new Error(`The key ${key} was already registered`);
    }

    this.registry[key] = value;
    return value;
  }

  getBy(key) {
    return this.registry[key];
  }

  iterate(iterator, filter) {
    if (!iterator) throw new Error("Can't iterate without iterator.");

    if (filter && filter.length > 0) {
      return Object.keys(this.registry)
        .filter(key => filter.includes(key)).forEach(iterator);
    }

    return Object.keys(this.registry).forEach(iterator);
  }
};
