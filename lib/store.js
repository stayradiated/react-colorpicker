var Reflux = require('reflux');
var Color = require('color');

var actions = require('./actions');

var store = Reflux.createStore({

  init: function () {
    // these values should all be between 0 and 1
    this.hue = 0;
    this.saturation = 0.7;
    this.value = 0.5;

    this.listenTo(actions.setHue, this.setHue);
    this.listenTo(actions.setSaturation, this.setSaturation);
    this.listenTo(actions.setValue, this.setValue);
  },

  setHue: function (hue) {
    this.hue = hue;
    this.trigger();
  },

  setSaturation: function (saturation) {
    this.saturation = saturation;
    this.trigger();
  },

  setValue: function (value) {
    this.value = value;
    this.trigger();
  },

  toColor: function () {
    return Color().hsv(
      this.hue * 360,
      this.saturation * 100,
      this.value * 100
    );
  },

  toHsv: function () {
    return this.toColor().hsv();
  },

  toRgb: function () {
    return this.toColor().rgb();
  },

  toHex: function () {
    return this.toColor().hexString();
  },

  toHue: function () {
    return Color().hsv(this.hue * 360, 100, 100).hexString();
  },

  toLum: function () {
    return this.toColor().luminosity();
  }

});

module.exports = store;
