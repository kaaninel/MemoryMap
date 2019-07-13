const { FuseBox } = require("fuse-box");
const fuse = FuseBox.init({
  homeDir: "src",
  target: "server@esnext",
  output: "$name.js"
});
fuse
  .bundle("test")
  .instructions(" > test.ts")
  .completed(proc => proc.start())
  .watch();
fuse.run();
