var Colr = require('colr');

Colr.prototype.toScaledHsvObject = function () {
  var hsv = this.toHsvObject();
  return {
    h: hsv.h / 360,
    s: hsv.s / 100,
    v: hsv.v / 100,
  };
};

Colr.fromScaledHsvObject = function (obj) {
  return Colr.fromHsv(
    obj.h * 360,
    obj.s * 100,
    obj.v * 100
  );
};

module.exports = require('./components/colorpicker.react');
