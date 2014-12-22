var Colr = require('colr');
var React = require('react');
var ColorPicker = require('../lib/index');

window.React = React;
React.initializeTouchEvents(true);

var App = React.createClass({

  getInitialState: function () {
    return {
      color: '#000000',
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
      color: color.toHex()
    });
  },

  handleChange: function (color) {
    console.log(color)
    if(color) this.setState({
      color: color.toHex()
    });
    else console.log('empty color')
  },

  render: function () {
    /* jshint ignore: start */
    return (
      <div>
        <button onClick={this.setColor}>Load Random Color</button>
        <div>Active: {this.state.color}</div>

        <div id='container'>
          <ColorPicker
            color={this.state.color}
            onChange={this.handleChange}
            allowEmpty={true}
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
