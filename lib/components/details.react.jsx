var React = require('react');

var store = require('../store');

var Details = React.createClass({

  render: function () {
    var rgb = store.toRgb();
    var hex = store.toHex();
    var hsv = store.toHsv();

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
            <span className="value">{ hsv.h }</span>
          </li>
          <li>
            <label>S:</label>
            <span className="value">{ hsv.s }</span>
          </li>
          <li>
            <label>B:</label>
            <span className="value">{ hsv.v }</span>
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
