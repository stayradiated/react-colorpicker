var React = require('react');
var ColorPicker = require('../lib/index');

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('container');
  React.renderComponent(<ColorPicker />, container);
});
