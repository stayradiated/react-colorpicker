'use strict';

var React = require('react');
var Colr = require('colr');

var Details = require('./details.react');
var Map = require('./map.react');
var Sample = require('./sample.react');
var Slider = require('./slider.react');
var OnChangeMixin = require('../mixin/onchange.react');

var ColorPicker = React.createClass({

  mixins: [OnChangeMixin],

  propTypes: {
    // you can pass in hex strings or Colr instances
    color: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Colr)
    ]),
  },

  // default colors
  getDefaultProps: function () {
    var initial = Colr.fromHex('#808080');
    return {
      color: initial
    };
  },

  // create the initial state using props.color 
  getInitialState: function () {
    var color = this.makeColor(this.props.color);
    return this.makeState(color);
  },

  // convert hex string into a Colr instance
  makeColor: function (color) {
    return typeof color === 'string' ? Colr.fromHex(color) : color;
  },
 
  // generate state object from a Colr instance
  makeState: function (color) {
    return {
      color: color,
      origin: color.clone(),
      rawHsv: color.toScaledHsvObject()
    };
  },

  // replace current color with another one
  loadColor: function (color) {
    this.setState(this.makeState(color));
    this.props.onChange(color);
  },

  // update the current color using the raw hsv values
  update: function () {
    var color = Colr.fromHsv(
      this.state.rawHsv.h * 360,
      this.state.rawHsv.s * 100,
      this.state.rawHsv.v * 100
    );

    this.setState({ color: color });
    this.props.onChange(color);
  },

  // set the hue
  setHue: function (hue) {
    this.state.rawHsv.h = hue;
    this.update();
  },

  // set the saturation
  setSaturation: function (saturation) {
    this.state.rawHsv.s = saturation;
    this.update();
  },

  // set the value
  setValue: function (value) {
    this.state.rawHsv.v = value;
    this.update();
  },

  // set the saturation and the value
  setSaturationAndValue: function (saturation, value) {
    this.state.rawHsv.s = saturation;
    this.state.rawHsv.v = value;
    this.update();
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="light-slider">
          <Slider
            vertical={true}
            value={this.state.rawHsv.v}
            onChange={this.setValue}
          />
        </div>
        <div className="sat-slider">
          <Slider
            vertical={false}
            value={this.state.rawHsv.s}
            onChange={this.setSaturation}
          />
        </div>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={this.state.rawHsv.h}
            onChange={this.setHue}
          />
        </div>
        <Map
          color={this.state.color}
          rawHsv={this.state.rawHsv}
          onChange={this.setSaturationAndValue}
        />
        <Details
          color={this.state.color}
          rawHsv={this.state.rawHsv}
          onChange={this.loadColor}
        />
        <Sample
          color={this.state.color}
          origin={this.state.origin}
          onChange={this.loadColor}
        />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = ColorPicker;
