'use strict';

var React = require('react');
var Colr = require('colr');

var OnChangeMixin = require('../mixin/onchange.react');

var Sample = React.createClass({

  mixins: [OnChangeMixin],

  propTypes: {
    color: React.PropTypes.instanceOf(Colr).isRequired,
    original: React.PropTypes.instanceOf(Colr).isRequired,
  },

  _loadCurrent: function () {
    this.props.onChange(this.props.color);
  },

  _loadOriginal: function () {
    this.props.onChange(this.props.original);
  },

  render: function () {
    var currentStyle = {
      background: this.props.color.toHex()
    };
    var originalStyle = {
      background: this.props.original.toHex()
    };

    return (
      /* jshint ignore: start */
      <div className='sample'>
        <div
          className='current' 
          style={currentStyle}
          onClick={this._loadCurrent}
        />
        <div
          className='original'
          style={originalStyle}
          onClick={this._loadOriginal}
        />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Sample;
