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

