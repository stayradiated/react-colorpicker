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
    this.listenTo(store, this.forceUpdate);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="light-slider">
          <Slider
            vertical={true}
            value={store.value}
            onChange={actions.setValue}
          />
        </div>
        <div className="sat-slider">
          <Slider
            vertical={false}
            value={store.saturation}
            onChange={actions.setSaturation}
          />
        </div>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={store.hue}
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
