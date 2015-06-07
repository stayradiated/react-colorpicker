'use strict';

var React = require('../util/react');
var Colr = require('colr');
var classnames = require('classnames');

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

  // default color
  getDefaultProps: function () {
    return {
      color: '#000000'
    };
  },

  // compare props against state using hex strings
  // only use the new props if the color is different
  // this prevents data loss when converting between RGB and HSV
  componentWillReceiveProps: function(nextProps) {
    var nextColor = nextProps.color.toLowerCase();
    var currentColor = Colr.fromHsvObject(this.state.hsv).toHex();

    if(nextColor !== currentColor) {
      this.setState(this.getStateFrom(nextProps.color));
    }
  },

  // create the initial state using props.color
  getInitialState: function () {
    return this.getStateFrom(this.props.color);
  },

  // generate state object from a hex string
  getStateFrom: function (color) {
    color = Colr.fromHex(color);
    return {
      color: color,
      origin: color.clone(),
      hsv: color.toRawHsvObject()
    };
  },

  render: function () {
    var hue = this.getBackgroundHue();
    var luminosity = this.state.color.toGrayscale();

    var classes = classnames({
      dark: luminosity <= 128,
      light: luminosity > 128,
    });

    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="light-slider">
          <Slider
            vertical={true}
            value={this.state.hsv.v}
            max={100}
            onChange={this.setValue}
          />
        </div>
        <div className="sat-slider">
          <Slider
            vertical={false}
            value={this.state.hsv.s}
            max={100}
            onChange={this.setSaturation}
          />
        </div>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={this.state.hsv.h}
            max={360}
            onChange={this.setHue}
          />
        </div>
        <Map
          x={this.state.hsv.s}
          y={this.state.hsv.v}
          max={100}
          backgroundColor={hue}
          className={classes}
          onChange={this.setSaturationAndValue}
        />
        <Details
          color={this.state.color}
          hsv={this.state.hsv}
          onChange={this.loadColor}
        />
        <Sample
          color={this.state.color.toHex()}
          origin={this.state.origin.toHex()}
          onChange={this.loadColor}
        />
        {this.props.children}
      </div>
      /* jshint ignore: end */
    );
  },

  // replace current color with another one
  loadColor: function (color) {
    this.setState(this.getStateFrom(color));
    this.props.onChange(Colr.fromHex(color));
  },

  // update the current color using the raw hsv values
  update: function () {
    var color = Colr.fromHsvObject(this.state.hsv);
    this.setState({ color: color });
    this.props.onChange(color);
  },

  // set the hue
  setHue: function (hue) {
    this.state.hsv.h = hue;
    this.update();
  },

  // set the saturation
  setSaturation: function (saturation) {
    this.state.hsv.s = saturation;
    this.update();
  },

  // set the value
  setValue: function (value) {
    this.state.hsv.v = value;
    this.update();
  },

  // set the saturation and the value
  setSaturationAndValue: function (saturation, value) {
    this.state.hsv.s = saturation;
    this.state.hsv.v = value;
    this.update();
  },

  getBackgroundHue : function() {
    return Colr.fromHsv(this.state.hsv.h, 100, 100).toHex();
  },


});

module.exports = ColorPicker;
