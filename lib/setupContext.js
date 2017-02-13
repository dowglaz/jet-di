module.exports = ({
  Context,
  localRequire,
  localRegistry,
  globalRegistry,
  externalRegistry,
  packageConfigs,
  functions,
  cloneDeep,
}) => {
  const dependencies = packageConfigs.dependencies;
  const depMap = packageConfigs.depMap;
  const globalDependencies = packageConfigs.globalDependencies;

  const construct = functions.construct;
  const setDependencies = functions.setDependencies;

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
