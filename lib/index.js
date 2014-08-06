var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var ColorPicker = require('./components/colorpicker.react');

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

  componentDidMount: function () {
    store.load(this.props.color);
    this.listenTo(store, this.props.onChange);
  },

  render: function () {
    return new ColorPicker();
  }

});

module.exports = App;
