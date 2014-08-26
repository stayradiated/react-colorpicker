var React = require('react');
var Reflux = require('reflux');
var Colr = require('colr');

var store = require('./store');
var ColorPicker = require('./components/colorpicker.react');

var throttle = function (fn) {
  var last = [-1,-1,-1];
  return function (color) {
    var rgb  = color.toRgbArray();
    if (rgb[0] != last[0] || rgb[1] != last[1] || rgb[2] != last[2]) {
      fn(color);
      last = rgb;
    }
  };
};

var App = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    color: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      color: '#c0ffee',
      onChange: function () {}
    };
  },

  componentWillReceiveProps: function (props) {
    store.load(Colr.fromHex(props.color));
  },
 
  componentDidMount: function () {
    console.log('mounting component', this.props.color);
    store.load(Colr.fromHex(this.props.color));
    this.listenTo(store, throttle(this.props.onChange));
  },

  render: function () {
    return new ColorPicker();
  }

});

module.exports = App;
