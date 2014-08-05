var React = require('react');
var tiny = require('tinycolor2');
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

  handleMapChange: function (sat, lightness) {
    this.setState({
      s: sat,
      l: lightness
    });
  },

  render: function () {
    var color = tiny([
      'hsv(',
      this.state.h * 360,
      ', ', 
      this.state.s * 100,
      '%, ',
      this.state.l * 100,
      '%)'
    ].join(''));

    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="light-slider">
          <Slider vertical={true} value={this.state.l} onChange={this.handleLightnessChange} />
        </div>
        <div className="sat-slider">
          <Slider vertical={false} value={this.state.s} onChange={this.handleSaturationChange} />
        </div>
        <div className="hue-slider">
          <Slider vertical={true} value={this.state.h} onChange={this.handleHueChange} />
        </div>
        <Map h={this.state.h} s={this.state.s} l={this.state.l} onChange={this.handleMapChange} />
        <Details color={color} h={this.state.h} s={this.state.s} l={this.state.l} />
        <Sample color={color} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = ColorPicker;
