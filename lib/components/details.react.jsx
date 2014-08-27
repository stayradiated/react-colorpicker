'use strict';

var React = require('react');
var Colr = require('colr');

var Details = React.createClass({

  propTypes: {
    color: React.PropTypes.instanceOf(Colr).isRequired,
    rawHsv: React.PropTypes.object.isRequired,
  },

  render: function () {
    var rgb = this.props.color.toRgbObject();
    var hex = this.props.color.toHex();
    var hsv = {
      h: Math.round(this.props.rawHsv.h * 360),
      s: Math.round(this.props.rawHsv.s * 100),
      v: Math.round(this.props.rawHsv.v * 100),
    };

    return (
      /* jshint ignore: start */
      <div className="details">
        <ul className="rgb">
          <li>
            <label>R:</label>
            <span className="value">{ rgb.r }</span>
          </li>
          <li>
            <label>G:</label>
            <span className="value">{ rgb.g }</span>
          </li>
          <li>
            <label>B:</label>
            <span className="value">{ rgb.b }</span>
          </li>
        </ul>
        <ul className="hsv">
          <li>
            <label>H:</label>
            <span className="value">{ hsv.h }°</span>
          </li>
          <li>
            <label>S:</label>
            <span className="value">{ hsv.s }%</span>
          </li>
          <li>
            <label>B:</label>
            <span className="value">{ hsv.v }%</span>
          </li>
        </ul>
        <ul className="hex">
          <li><label>#</label>
          <span className="value">{ hex.slice(1) }</span></li>
        </ul>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Details;
