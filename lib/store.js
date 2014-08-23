var Reflux = require('reflux');
var Colr = require('colr');

var actions = require('./actions');

var state = Colr.fromRgb(0,0,0);
var rawHsv = { h: 0, s: 0, v: 0 };

var store = Reflux.createStore({

  init: function () {
    this.listenTo(actions.setHue, this.setHue);
    this.listenTo(actions.setSaturation, this.setSaturation);
    this.listenTo(actions.setValue, this.setValue);
  },

  load: function (color) {
    // overwrite state
    state = color;
    rawHsv = this.toScaledHsv();
    this.trigger(state);
  },

  _updateState: function () {
    state.fromHsv(rawHsv.h * 360, rawHsv.s * 100, rawHsv.v * 100);
    this.trigger(state);
  },

  setHue: function (hue) {
    rawHsv.h = hue;
    this._updateState();
  },

  setSaturation: function (saturation) {
    rawHsv.s = saturation;
    this._updateState();
  },

  setValue: function (value) {
    rawHsv.v = value;
    this._updateState();
  },

  toHsv: function () {
    return state.toHsvObject();
  },

  toScaledHsv: function () { 
    var hsv = state.toHsvObject();
    return {
      h: hsv.h / 360,
      s: hsv.s / 100,
      v: hsv.v / 100
    };
  },

  toRawHsv: function () {
    return {
      h: rawHsv.h,
      s: rawHsv.s,
      v: rawHsv.v,
    }
  },

  toRgb: function () {
    return state.toRgbObject();
  },

  toHex: function () {
    return state.toHex();
  },

  toHue: function () {
    return Colr.fromHsv(rawHsv.h * 360, 100, 100).toHex();
  },

  toLum: function () {
    return state.toGrayscale() / 255;
  }

});

module.exports = store;
