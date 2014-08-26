var React = require('react/addons');

var clamp = require('../util/clamp');
var DraggableMixin = require('./draggable.react');

var Slider = React.createClass({

  mixins: [DraggableMixin],

  propTypes: {
    vertical: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number.isRequired,
  },

  updatePosition: function (clientX, clientY) {
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();

    var value;
    if (this.props.vertical) {
      value = (rect.bottom - clientY) / rect.height;
    } else {
      value = (clientX - rect.left) / rect.width;
    }

    value = clamp(value, 0, 1);
    this.props.onChange(value);
  },

  render: function () {
    var classes = React.addons.classSet({
      slider: true,
      vertical: this.props.vertical,
      horizontal: ! this.props.vertical
    });

    var styles = {};
    var attr = this.props.vertical ? 'bottom' : 'left';
    styles[attr] = this.props.value * 100 + '%';

    return (
      /* jshint ignore: start */
      <div className={classes} onMouseDown={this.handleMouseDown}>
        <div className="track" />
        <div className="pointer" style={styles} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Slider;
