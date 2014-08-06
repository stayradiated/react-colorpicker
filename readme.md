# React-ColorPicker

> A simple colorpicker written using React.

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
        // color is a Color instance
        // https://github.com/harthur/color

        console.log(color.hexString());
    }
});

React.renderComponent(colorpicker, document.body);
```

