var React = require('react');
var ColorPicker = require('../lib/index');

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('container');

  var colorpicker = new ColorPicker({
    color: '#bada55',
    onChange: function (color) {
      console.log(color.toHex());
    }
  });

  React.renderComponent(colorpicker, container);
});
