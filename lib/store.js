var Reflux = require('reflux');
var HSV = require('c0lor/hsv');
var HEX = require('c0lor/RGB');

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

  toHsv: function () {
    return {
      h: Math.round(this.hue * 360),
      s: Math.round(this.saturation * 100),
      v: Math.round(this.value * 100)
    };
  },

  toRgb: function () {
    var rgb = HSV(this.hue, this.saturation, this.value).rgb();
    return {
      r: Math.round(rgb.r * 255),
      g: Math.round(rgb.g * 255),
      b: Math.round(rgb.b * 255)
    };
  },

  toHex: function () {
    var rgb = this.toRgb();
    return HEX(rgb.r, rgb.g, rgb.b).hex();
  },

  toSaturatedHex: function () {
    var rgb = HSV(this.hue, 1, 1).rgb();
    return HEX(
      Math.round(rgb.r * 255),
      Math.round(rgb.g * 255),
      Math.round(rgb.b * 255)
    ).hex();
  }

});

module.exports = store;
