var Reflux = require('reflux');
var Color = require('color');

var actions = require('./actions');

var state = Color().rgb(0,0,0);
var raw = { h: 0, s: 0, v: 0 };

var store = Reflux.createStore({

  init: function () {
    this.listenTo(actions.setHue, this.setHue);
    this.listenTo(actions.setSaturation, this.setSaturation);
    this.listenTo(actions.setValue, this.setValue);
  },

  load: function (color) {
    // overwrite state
    state = Color(color);
    raw = this.toScaledHsv();
    this.trigger(state);
  },

  setHue: function (hue) {
    raw.h = hue;
    state.hue(hue * 360);
    this.trigger(state);
  },

  setSaturation: function (saturation) {
    raw.s = saturation;
    state.saturationv(saturation * 100);
    this.trigger(state);
  },

  setValue: function (value) {
    raw.v = value;
    state.value(value * 100);
    this.trigger(state);
  },

  toHsv: function () {
    return state.hsv();
  },

  toScaledHsv: function () { 
    var hsv = state.hsv();
    return {
      h: hsv.h / 360,
      s: hsv.s / 100,
      v: hsv.v / 100
    };
  },

  toRawHsv: function () {
    return raw;
  },

  toRgb: function () {
    return state.rgb();
  },

  toHex: function () {
    return state.hexString();
  },

  toHue: function () {
    return Color().hsv(state.hue(), 100, 100).hexString();
  },

  toLum: function () {
    return state.luminosity();
  }

});

module.exports = store;
