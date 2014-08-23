# React-ColorPicker

> A simple colorpicker written using React.

Uses the `Colr` library: https://github.com/stayradiated/colr

## Installation

```
npm install --save react-colorpicker
```

## Usage

```javascript
var React = require('react');
var ColorPicker = require('react-colorpicker');

var colorpicker = new ColorPicker({
    color: '#c0ffee',
    onChange: function (color) {
        // fired whenever user changes color

        console.log(color.hexString());
    }
});

React.renderComponent(colorpicker, document.body);
```

