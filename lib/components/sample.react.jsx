var React = require('react');
var tiny = require('tinytinycolor');

var Sample = React.createClass({

  propTypes: {
    color: React.PropTypes.instanceOf(tiny).isRequired
  },

  render: function () {
    return (
      <div className="sample" style={{
        background: this.props.color.toHexString()
      }} />
    );
  }

});

module.exports = Sample;
