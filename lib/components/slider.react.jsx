var React = require('react');
var tiny = require('tinytinycolor');

var Slider = React.createClass({

  propTypes: {
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

  handleMouseDown: function () {
    this.setState({
      active: true
    });
  },

  handleMouseMove: function (e) {
    if (! this.state.active) return;
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();
    var value = (e.clientY - rect.top) / rect.height;

    if (value < 0) value = 0;
    else if (value > 1) value = 1;
    
    value = 1 - value;

    this.props.onChange(value);
  },

  handleMouseUp: function () {
    if (! this.state.active) return;
    this.setState({
      active: false
    });
  },

  render: function () {
    return (
      <div className="slider" onMouseDown={this.handleMouseDown}>
        <div className="track" />
        <div className="pointer" style={{
          top: (100 - this.props.value * 100) + '%'
        }} />
      </div>
    );
  }

});

module.exports = Slider;
