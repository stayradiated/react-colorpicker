var Reflux = require('reflux');

var actions = Reflux.createActions([
  'setHue',
  'setSaturation',
  'setValue'
]);

module.exports = actions;
