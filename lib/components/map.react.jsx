var fs = require('fs');
var React = require('react');
var tiny = require('tinycolor2');

var Map = React.createClass({

  propTypes: {
    h: React.PropTypes.number.isRequired,
    s: React.PropTypes.number.isRequired,
    l: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      onChange: function () {}
    };
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  componentDidMount: function () {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  },

  handleMouseDown: function (e) {
    e.preventDefault();
    this.setState({
      active: true
    });
  },

  handleMouseMove: function (e) {
    if (! this.state.active) return;
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width;
    var y = (rect.bottom - e.clientY) / rect.height;

    if (x < 0) x = 0;
    else if (x > 1) x = 1;

    if (y < 0) y = 0;
    else if (y > 1) y = 1;

    this.props.onChange(
      x, // saturation
      y  // lightness
    );
  },

  handleMouseUp: function () {
    if (! this.state.active) return;
    this.setState({
      active: false
    });
  },


  render: function () {
    var lightness = this.props.l >= 1 ? 0.99 : this.props.l;
    var darkLight = lightness < 0.5 ? 'dark' : 'light';
    var bgColor = tiny([
      'hsv(',
      this.props.h * 360,
      ', 100%, 100%)' 
    ].join('')).toHexString();

    return (
      /* jshint ignore: start */
      <div className={'map ' + darkLight} onMouseDown={this.handleMouseDown}>
        <div className="background" style={{
          backgroundColor: bgColor
        }} />
        <div className="pointer" style={{
          top: (100 - this.props.l * 100) + '%',
          left: this.props.s * 100 + '%'
        }} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Map;
