var React = require('react');
var Reflux = require('reflux');

var store = require('../store');
var actions = require('../actions');

var Details = require('./details.react');
var Map = require('./map.react');
var Sample = require('./sample.react');
var Slider = require('./slider.react');

var ColorPicker = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function () {
    this.listenTo(store, this.onChange);
  },

  onChange: function () {
    this.forceUpdate();
  },

  render: function () {
    var rawHsv = store.toRawHsv();

    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="light-slider">
          <Slider
            vertical={true}
            value={rawHsv.v}
            onChange={actions.setValue}
          />
        </div>
        <div className="sat-slider">
          <Slider
            vertical={false}
            value={rawHsv.s}
            onChange={actions.setSaturation}
          />
        </div>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={rawHsv.h}
            onChange={actions.setHue}
          />
        </div>
        <Map />
        <Details />
        <Sample />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = ColorPicker;
