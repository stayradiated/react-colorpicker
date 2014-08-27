'use strict';

var React = require('react');
var Colr = require('colr');

var OnChangeMixin = require('../mixin/onchange.react');

var Sample = React.createClass({

  mixins: [OnChangeMixin],

  propTypes: {
    color: React.PropTypes.instanceOf(Colr).isRequired,
    origin: React.PropTypes.instanceOf(Colr).isRequired,
  },

  _loadOrigin: function () {
    this.props.onChange(this.props.origin);
  },

  render: function () {
    var currentStyle = {
      background: this.props.color.toHex()
    };
    var originStyle = {
      background: this.props.origin.toHex()
    };

    return (
      /* jshint ignore: start */
      <div className='sample'>
        <div
          className='current' 
          style={currentStyle}
        />
        <div
          className='origin'
          style={originStyle}
          onClick={this._loadOrigin}
        />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Sample;
