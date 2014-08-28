# React-ColorPicker

> A simple colorpicker written using React.

Uses the `Colr` library: https://github.com/stayradiated/colr

## Installation

```
npm install --save react-colorpicker
```

You will also need to add some css styles.

See the [example stylesheet](example/colorpicker.scss) for ideas.

## Example Usage

```javascript
var React = require('react');
var ColorPicker = require('react-colorpicker');

var colorpicker = new ColorPicker({
    color: '#c0ffee',
    onChange: function (color) {
        // called whenever the color is changed
        console.log(color.hexString());
    }
});

React.renderComponent(colorpicker, document.body);
```

## Setting the Color

Just change the `color` attribute. Simple.

```javascript
var Colr = require('colr');
var React = require('react');
var ColorPicker = require('react-colorpicker');

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
    this.setState({
      color: color.toHex()
    });
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
```

## License

MIT
