'use strict';

var React = require('react/addons');
var Colr = require('colr');

var clamp = require('../util/clamp');
var DraggableMixin = require('../mixin/draggable.react');
var OnChangeMixin = require('../mixin/onchange.react');

var Map = React.createClass({

  mixins: [DraggableMixin, OnChangeMixin],

  propTypes: {
    color: React.PropTypes.instanceOf(Colr).isRequired,
    rawHsv: React.PropTypes.object.isRequired,
  },

  updatePosition: function (clientX, clientY) {
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = clamp(x, 0, 1);
    y = clamp(y, 0, 1);

    this.props.onChange(x, y);
  },

  render: function () {
    var luminosity = this.props.color.toGrayscale();

    var classes = React.addons.classSet({
      map: true,
      dark: luminosity <= 0.5,
      light: luminosity > 0.5,
      active: this.state.active
    });

    var bgHue = Colr.fromHsv(this.props.rawHsv.h * 360, 100, 100);
    var top = 100 - (this.props.rawHsv.v * 100);
    var left = this.props.rawHsv.s * 100;

    return (
      /* jshint ignore: start */
      <div className={classes} onMouseDown={this.handleMouseDown}>
        <div className="background" style={{
          backgroundColor: bgHue.toHex()
        }} />
        <div className="pointer" style={{
          top: top + '%',
          left: left + '%'
        }} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Map;
