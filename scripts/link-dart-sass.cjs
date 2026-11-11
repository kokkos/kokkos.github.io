// npm's sass-embedded and its fallback "sass" dependency both declare a "sass" bin,
// so npm's bin-hoisting can leave node_modules/.bin/sass pointing at the pure-JS
// "sass" package instead of sass-embedded's native-binary wrapper. Hugo's Dart Sass
// client requires the native "--embedded" protocol, which the pure-JS package
// refuses to speak, so re-point the shim at sass-embedded's own bin explicitly.
const fs = require('fs');
const path = require('path');

const embeddedBin = path.join('node_modules', 'sass-embedded', 'dist', 'bin', 'sass.js');
const shim = path.join('node_modules', '.bin', 'sass');

if (fs.existsSync(embeddedBin)) {
  fs.rmSync(shim, { force: true });
  fs.symlinkSync(path.relative(path.dirname(shim), embeddedBin), shim);
  fs.chmodSync(shim, 0o755);
}
