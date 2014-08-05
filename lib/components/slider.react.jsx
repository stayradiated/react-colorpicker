var React = require('react/addons');
var tiny = require('tinycolor2');

var Slider = React.createClass({

  propTypes: {
    vertical: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number.isRequired,
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

  componentWillUnmount: function () {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  },

  handleMouseDown: function () {
    this.setState({
      active: true
    });
  },

  handleMouseMove: function (e) {
    if (! this.state.active) return;
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();

    var value;
    if (this.props.vertical) {
      value = (rect.bottom - e.clientY) / rect.height;
    } else {
      value = (e.clientX - rect.left) / rect.width;
    }

    if (value < 0) value = 0;
    else if (value > 1) value = 1;
    
    this.props.onChange(value);
  },

  handleMouseUp: function () {
    if (! this.state.active) return;
    this.setState({
      active: false
    });
  },

  getCss: function () {
    var obj = {};
    var attr = this.props.vertical ? 'bottom' : 'left';
    obj[attr] = this.props.value * 100 + '%';
    return obj;
  },

  render: function () {
    var classes = React.addons.classSet({
      slider: true,
      vertical: this.props.vertical,
      horizontal: ! this.props.vertical
    });

    return (
      /* jshint ignore: start */
      <div className={classes} onMouseDown={this.handleMouseDown}>
        <div className="track" />
        <div className="pointer" style={this.getCss()} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Slider;
