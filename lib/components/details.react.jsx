var React = require('react');
var tiny = require('tinytinycolor');

var Details = React.createClass({

  propTypes: {
    h: React.PropTypes.number.isRequired,
    s: React.PropTypes.number.isRequired,
    l: React.PropTypes.number.isRequired,
    color: React.PropTypes.instanceOf(tiny).isRequired
  },

  render: function () {
    var rgb = this.props.color.toRgb();
    var hex = this.props.color.toHex();
    var hsl = {
      h: Math.round(this.props.h * 360),
      s: Math.round(this.props.s * 100),
      l: Math.round(this.props.l * 100)
    };

    return (
      <div className="details">
        <ul className="rgb">
          <li><label>R:</label> <span className="value">{ rgb.r }</span></li>
          <li><label>G:</label> <span className="value">{ rgb.g }</span></li>
          <li><label>B:</label> <span className="value">{ rgb.b }</span></li>
        </ul>
        <ul className="hsl">
          <li><label>H:</label> <span className="value">{ hsl.h }</span></li>
          <li><label>S:</label> <span className="value">{ hsl.s }</span></li>
          <li><label>L:</label> <span className="value">{ hsl.l }</span></li>
        </ul>
        <ul className="hex">
          <li><label>#</label> <span className="value">{ hex }</span></li>
        </ul>
      </div>
    );
  }

});

module.exports = Details;
