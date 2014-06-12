var React = require('react');
var husl = require('husl');
var tiny = require('tinytinycolor');
var Details = require('./details.react');
var Map = require('./map.react');
var Sample = require('./sample.react');
var Slider = require('./slider.react');

var ColorPicker = React.createClass({

  propTypes: {
    color: React.PropTypes.instanceOf(tiny)
  },

  getDefaultProps: function () {
    return {
      color: tiny('#808080')
    };
  },

  getInitialState: function () {
    return this.props.color.toHsl();
  },

  handleHueChange: function (hue) {
    this.setState({
      h: hue 
    });
  },

  handleSaturationChange: function (saturation) {
    this.setState({
      s: saturation
    });
  },

  handleLightnessChange: function (lightness) {
    this.setState({
      l: lightness
    });
  },

  handleMapChange: function (hue, sat) {
    this.setState({
      h: hue,
      s: sat
    });
  },

  render: function () {
    var color = tiny(husl.toHex(this.state.h * 360, this.state.s * 100, this.state.l * 100));

    return (
      <div className="colorpicker">
        <div className="hue-slider">
          <Slider vertical={false} value={this.state.h} onChange={this.handleHueChange} />
        </div>
        <div className="sat-slider">
          <Slider vertical={true} value={this.state.s} onChange={this.handleSaturationChange} />
        </div>
        <div className="light-slider">
          <Slider vertical={true} value={this.state.l} onChange={this.handleLightnessChange} />
        </div>
        <Map h={this.state.h} s={this.state.s} l={this.state.l} onChange={this.handleMapChange} />
        <Details color={color} h={this.state.h} s={this.state.s} l={this.state.l} />
        <Sample color={color} />
      </div>
    );
  }

});

module.exports = ColorPicker;
