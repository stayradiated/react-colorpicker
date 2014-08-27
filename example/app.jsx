var Colr = require('colr');
var React = require('react');
var ColorPicker = require('../lib/index');

var App = React.createClass({

  getInitialState: function () {
    var color = Colr.fromHex('FFF');
    return {
      color: color,
      origin: color.clone()
    };
  },

  setColor: function () {
    var color = Colr.fromRgb(
      Math.random() * 255, 
      Math.random() * 255, 
      Math.random() * 255
    );

    // replace current color and origin color
    this.setState({
      color: color,
      origin: color.clone(),
    });
  },

  handleChange: function (color) {
    this.setState({
      color: color
    });
  },

  render: function () {
    /* jshint ignore: start */
    return (
      <div>
        <button onClick={this.setColor}>Load Random Color</button>
        <div>Active: {this.state.color.toHex()}</div>
        <div>Origin: {this.state.origin.toHex()}</div>

        <div id='container'>
          <ColorPicker
            key={this.state.origin}
            color={this.state.color}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
    /* jshint ignore: end */
  },

});

document.addEventListener('DOMContentLoaded', function () {
  React.renderComponent(new App(), document.body);
});
