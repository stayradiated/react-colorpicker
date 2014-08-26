var React = require('react');

var store = require('../store');

var Sample = React.createClass({

  loadOriginal: function () {
    store.load(store.original());
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='sample'>
        <div className='current' style={{
          background: store.toHex()
        }} />
        <div className='original' style={{
          background: store.original().toHex()
        }} onClick={this.loadOriginal} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Sample;
