var React = require('react');
var tiny = require('tinycolor2');

var Sample = React.createClass({

  propTypes: {
    color: React.PropTypes.instanceOf(tiny).isRequired
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className="sample" style={{
        background: this.props.color.toHexString()
      }} />
      /* jshint ignore: end */
    );
  }

});

module.exports = Sample;
