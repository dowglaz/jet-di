module.exports = (params) => {
  const Context = params.Context;
  const localRequire = params.localRequire;
  const localRegistry = params.localRegistry;
  const globalRegistry = params.globalRegistry;
  const externalRegistry = params.externalRegistry;

  const dependencies = params.packageConfigs.dependencies;
  const depMap = params.packageConfigs.depMap;
  const globalDependencies = params.packageConfigs.globalDependencies;

  const construct = params.functions.construct;
  const setDependencies = params.functions.setDependencies;
  const cloneDeep = params.cloneDeep;

  if (globalDependencies) {
    setDependencies(globalDependencies, globalDependencies)
      .on(globalRegistry).using(localRequire);
  }

  if (dependencies) {
    setDependencies(dependencies, depMap)
      .on(externalRegistry).using(localRequire);
  }

  localRegistry.set({ externalRegistry });
  localRegistry.set({ localRegistry });
  localRegistry.set({ construct });
  localRegistry.set({ cloneDeep });

  return construct(
    Context, localRegistry, externalRegistry, globalRegistry);
};
