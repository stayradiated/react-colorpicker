var React = require("react");

function noop() {}

var DraggableMixin = {

  propTypes: {
    onChange : React.PropTypes.func
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  getDefaultProps: function () {
    return {
      onChange: noop
    };
  },

  componentDidMount: function() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  },

  componentWillUnmount: function() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  },

  handleMouseDown: function (e) {
    this.setState({ active: true });
    this.updatePosition(e.clientX, e.clientY);
  },

  handleMouseMove: function (e) {
    if (this.state.active) {
      this.updatePosition(e.clientX, e.clientY);
    }
  },

  handleMouseUp: function () {
    if(this.state.active) {
      this.setState({ active: false });
    }
  }

};

module.exports = DraggableMixin;
