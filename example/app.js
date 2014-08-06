var React = require('react');
var ColorPicker = require('../lib/index');

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('container');

  var colorpicker = new ColorPicker({
    color: '#408080',
    onChange: function (color) {
      // do something with color
    }
  });

  React.renderComponent(colorpicker, container);
});
