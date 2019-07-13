const { FuseBox, QuantumPlugin } = require("fuse-box");
const fuse = FuseBox.init({
  useJsNext: true,
  homeDir: "src",
  target: "server@esnext",
  output: "$name.js",
  sourceMaps: true,
  plugins: [
    QuantumPlugin({
      bakeApiIntoBundle: true,
      containedAPI: true,
      treeshake: true,
      removeExportsInterop: true,
      uglify: {
        toplevel: true,
        mangle: true
      }
    })
  ]
});
fuse
  .bundle("lib")
  .instructions(" > index.ts")
  .completed(proc => proc.start())
  .watch();
fuse.run();
