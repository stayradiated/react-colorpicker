var React = require('react');

var store = require('../store');

var Sample = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <div className="sample" style={{
        background: store.toHex()
      }} />
      /* jshint ignore: end */
    );
  }

});

module.exports = Sample;
