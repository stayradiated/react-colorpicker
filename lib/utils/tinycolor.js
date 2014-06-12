var tiny = require('tinytinycolor');

tiny.prototype.toPercentageHsl = function () {
  var hsl = this.toHsl();
  hsl.h = Math.round(hsl.h);
  hsl.s = Math.round(hsl.s * 100);
  hsl.l = Math.round(hsl.l * 100);
  return hsl;
};

module.exports = tiny;

