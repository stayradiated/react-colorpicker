var React = require('react/addons');

var clamp = require('../util/clamp');
var store = require('../store');
var actions = require('../actions');
var DraggableMixin = require('./draggable.react');

var Map = React.createClass({

  mixins: [DraggableMixin],

  updatePosition: function (clientX, clientY) {
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = clamp(x, 0, 1);
    y = clamp(y, 0, 1);

    actions.setSaturation(x);
    actions.setValue(y);
  },

  render: function () {
    var rawHsv = store.toRawHsv();
    var luminosity = store.toLum();

    var classes = React.addons.classSet({
      map: true,
      dark: luminosity <= 0.5,
      light: luminosity > 0.5,
      active: this.state.active
    });

    return (
      /* jshint ignore: start */
      <div className={classes} onMouseDown={this.handleMouseDown}>
        <div className="background" style={{
          backgroundColor: store.toHue()
        }} />
        <div className="pointer" style={{
          top: (100 - rawHsv.v * 100) + '%',
          left: rawHsv.s * 100 + '%'
        }} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Map;
