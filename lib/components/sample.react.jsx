'use strict';

var React = require('react/addons');
var Colr = require('colr');
var PureRenderMixin = React.addons.PureRenderMixin;

var OnChangeMixin = require('../mixin/onchange.react');

var Sample = React.createClass({

  mixins: [
    OnChangeMixin,
    PureRenderMixin,
  ],

  propTypes: {
    color: React.PropTypes.string.isRequired,
    origin: React.PropTypes.string.isRequired,
  },

  loadOrigin: function () {
    this.props.onChange(this.props.origin);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='sample'>
        {this.props.empty ? 'No color' :<div
          className='current' 
          style={{background: this.props.color}}/>}
        <div
          className='origin'
          style={{background: this.props.origin}}
          onClick={this.loadOrigin}
        />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Sample;
