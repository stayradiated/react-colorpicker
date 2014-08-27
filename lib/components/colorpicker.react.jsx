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
    color: React.PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      color: '#c0ffee'
    };
  },

  getInitialState: function () {
    return this._makeState(Colr.fromHex(this.props.color));
  },

  componentWillReceiveProps: function (props) {
    this._loadColor(Colr.fromHex(props.color));
  },
 
  _makeState: function (color) {
    return {
      color: color,
      rawHsv: color.toScaledHsvObject(),
      original: color.clone()
    };
  },

  _loadColor: function (color) {
    this.setState(this._makeState(color));
    this.props.onChange(color);
  },

  _update: function () {
    var color = Colr.fromHsv(
      this.state.rawHsv.h * 360,
      this.state.rawHsv.s * 100,
      this.state.rawHsv.v * 100
    );

    this.setState({ color: color });
    this.props.onChange(color);
  },

  _setHue: function (hue) {
    this.state.rawHsv.h = hue;
    this._update();
  },

  _setSaturation: function (saturation) {
    this.state.rawHsv.s = saturation;
    this._update();
  },

  _setValue: function (value) {
    this.state.rawHsv.v = value;
    this._update();
  },

  _setSaturationAndValue: function (saturation, value) {
    this.state.rawHsv.s = saturation;
    this.state.rawHsv.v = value;
    this._update();
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="light-slider">
          <Slider
            vertical={true}
            value={this.state.rawHsv.v}
            onChange={this._setValue}
          />
        </div>
        <div className="sat-slider">
          <Slider
            vertical={false}
            value={this.state.rawHsv.s}
            onChange={this._setSaturation}
          />
        </div>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={this.state.rawHsv.h}
            onChange={this._setHue}
          />
        </div>
        <Map
          color={this.state.color}
          rawHsv={this.state.rawHsv}
          onChange={this._setSaturationAndValue}
        />
        <Details
          color={this.state.color}
          rawHsv={this.state.rawHsv}
        />
        <Sample
          color={this.state.color}
          original={this.state.original}
          onChange={this._loadColor}
        />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = ColorPicker;
