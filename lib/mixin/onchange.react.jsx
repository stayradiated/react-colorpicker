'use strict';

var React = require('../util/react');

var noop = function () {};

var OnChangeMixin = {

  propTypes: {
    onChange : React.PropTypes.func,
  },

  getDefaultProps: function () {
    return {
      onChange: noop
    };
  }
};

module.exports = OnChangeMixin;
