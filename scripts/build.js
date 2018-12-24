const rollup = require("rollup");
const config = require("./config");

for (let moduleName in config) {
  const moduleConfig = config[moduleName];
  rollup.rollup(moduleConfig.input).then((bundle) => {
    bundle.write(moduleConfig.output);
  });
}
