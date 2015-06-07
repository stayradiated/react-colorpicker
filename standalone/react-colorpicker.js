(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactColorpicker = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/index.js":[function(require,module,exports){
module.exports = require('./components/colorpicker.react');


},{"./components/colorpicker.react":"/Volumes/Home/Projects/react-colorpicker/lib/components/colorpicker.react.jsx"}],"/Volumes/Home/Projects/react-colorpicker/lib/components/colorpicker.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');
var Colr = require('colr');
var classnames = require('classnames');

var Details = require('./details.react');
var Map = require('./map.react');
var Sample = require('./sample.react');
var Slider = require('./slider.react');
var OnChangeMixin = require('../mixin/onchange.react');

var ColorPicker = React.createClass({displayName: "ColorPicker",

  mixins: [OnChangeMixin],

  propTypes: {
    color: React.PropTypes.string,
  },

  // default color
  getDefaultProps: function () {
    return {
      color: '#000000'
    };
  },

  // compare props against state using hex strings
  // only use the new props if the color is different
  // this prevents data loss when converting between RGB and HSV
  componentWillReceiveProps: function(nextProps) {
    var nextColor = nextProps.color.toLowerCase();
    var currentColor = Colr.fromHsvObject(this.state.hsv).toHex();

    if(nextColor !== currentColor) {
      this.setState(this.getStateFrom(nextProps.color));
    }
  },

  // create the initial state using props.color
  getInitialState: function () {
    return this.getStateFrom(this.props.color);
  },

  // generate state object from a hex string
  getStateFrom: function (color) {
    color = Colr.fromHex(color);
    return {
      color: color,
      origin: color.clone(),
      hsv: color.toRawHsvObject()
    };
  },

  render: function () {
    var hue = this.getBackgroundHue();
    var luminosity = this.state.color.toGrayscale();

    var classes = classnames({
      dark: luminosity <= 128,
      light: luminosity > 128,
    });

    return (
      /* jshint ignore: start */
      React.createElement("div", {className: "colorpicker"}, 
        React.createElement("div", {className: "light-slider"}, 
          React.createElement(Slider, {
            vertical: true, 
            value: this.state.hsv.v, 
            max: 100, 
            onChange: this.setValue}
          )
        ), 
        React.createElement("div", {className: "sat-slider"}, 
          React.createElement(Slider, {
            vertical: false, 
            value: this.state.hsv.s, 
            max: 100, 
            onChange: this.setSaturation}
          )
        ), 
        React.createElement("div", {className: "hue-slider"}, 
          React.createElement(Slider, {
            vertical: true, 
            value: this.state.hsv.h, 
            max: 360, 
            onChange: this.setHue}
          )
        ), 
        React.createElement(Map, {
          x: this.state.hsv.s, 
          y: this.state.hsv.v, 
          max: 100, 
          backgroundColor: hue, 
          className: classes, 
          onChange: this.setSaturationAndValue}
        ), 
        React.createElement(Details, {
          color: this.state.color, 
          hsv: this.state.hsv, 
          onChange: this.loadColor}
        ), 
        React.createElement(Sample, {
          color: this.state.color.toHex(), 
          origin: this.state.origin.toHex(), 
          onChange: this.loadColor}
        ), 
        this.props.children
      )
      /* jshint ignore: end */
    );
  },

  // replace current color with another one
  loadColor: function (color) {
    this.setState(this.getStateFrom(color));
    this.props.onChange(Colr.fromHex(color));
  },

  // update the current color using the raw hsv values
  update: function () {
    var color = Colr.fromHsvObject(this.state.hsv);
    this.setState({ color: color });
    this.props.onChange(color);
  },

  // set the hue
  setHue: function (hue) {
    this.state.hsv.h = hue;
    this.update();
  },

  // set the saturation
  setSaturation: function (saturation) {
    this.state.hsv.s = saturation;
    this.update();
  },

  // set the value
  setValue: function (value) {
    this.state.hsv.v = value;
    this.update();
  },

  // set the saturation and the value
  setSaturationAndValue: function (saturation, value) {
    this.state.hsv.s = saturation;
    this.state.hsv.v = value;
    this.update();
  },

  getBackgroundHue : function() {
    return Colr.fromHsv(this.state.hsv.h, 100, 100).toHex();
  },


});

module.exports = ColorPicker;


},{"../mixin/onchange.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/onchange.react.jsx","../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js","./details.react":"/Volumes/Home/Projects/react-colorpicker/lib/components/details.react.jsx","./map.react":"/Volumes/Home/Projects/react-colorpicker/lib/components/map.react.jsx","./sample.react":"/Volumes/Home/Projects/react-colorpicker/lib/components/sample.react.jsx","./slider.react":"/Volumes/Home/Projects/react-colorpicker/lib/components/slider.react.jsx","classnames":"/Volumes/Home/Projects/react-colorpicker/node_modules/classnames/index.js","colr":"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/index.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/components/details.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');
var Colr = require('colr');

var Input = require('./input.react');
var OnChangeMixin = require('../mixin/onchange.react');

var Details = React.createClass({displayName: "Details",

  mixins: [OnChangeMixin],

  propTypes: {
    color: React.PropTypes.instanceOf(Colr).isRequired,
    hsv: React.PropTypes.object.isRequired,
  },

  handleRgb: function (id) {
    var self = this;
    return function (value) {
      var number = parseInt(value, 10);
      if (isNaN(number)) { return null; }
      var rgb = self.props.color.toRgbObject();
      rgb[id] = number;
      return Colr.fromRgbObject(rgb);
    };
  },

  handleHsv: function (id) {
    var self = this;
    return function (value) {
      var number = parseInt(value, 10);
      if (isNaN(number)) { return null; }
      var hsv = self.props.color.toHsvObject();
      hsv[id] = number;
      return Colr.fromHsvObject(hsv);
    };
  },

  handleHex: function (value) {
    try {
      return Colr.fromHex(value);
    } catch (e) {
      return null;
    }
  },

  render: function () {
    var hex = this.props.color.toHex().slice(1);
    var rgb = this.props.color.toRgbObject();
    var hsv = this.props.color.toHsvObject();

    return (
      /* jshint ignore: start */
      React.createElement("div", {className: "details"}, 
        React.createElement("ul", {className: "hex"}, 
          React.createElement(Input, {
            label: "#", value: hex, 
            fn: this.handleHex, 
            onChange: this.props.onChange}
          )
        ), 
        React.createElement("ul", {className: "rgb"}, 
          React.createElement(Input, {
            label: "R:", value: rgb.r, 
            fn: this.handleRgb('r'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "G:", value: rgb.g, 
            fn: this.handleRgb('g'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "B:", value: rgb.b, 
            fn: this.handleRgb('b'), 
            onChange: this.props.onChange}
          )
        ), 
        React.createElement("ul", {className: "hsv"}, 
          React.createElement(Input, {
            label: "H:", value: hsv.h, 
            fn: this.handleHsv('h'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "S:", value: hsv.s, 
            fn: this.handleHsv('s'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "B:", value: hsv.v, 
            fn: this.handleHsv('v'), 
            onChange: this.props.onChange}
          )
        )
      )
      /* jshint ignore: end */
    );
  }

});

module.exports = Details;


},{"../mixin/onchange.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/onchange.react.jsx","../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js","./input.react":"/Volumes/Home/Projects/react-colorpicker/lib/components/input.react.jsx","colr":"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/index.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/components/input.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');
var Colr = require('colr');

var OnChangeMixin = require('../mixin/onchange.react');

var Input = React.createClass({displayName: "Input",

  mixins: [OnChangeMixin],

  propTypes: {
    fn: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  },

  getInitialState: function () {
    return {
      value: '',
      isFocused: false
    };
  },

  componentDidMount: function () {
    this.setState({ value: this.props.value });
  },

  componentWillReceiveProps: function (props) {
    if (! this.state.isFocused) {
      this.setState({ value: props.value });
    }
  },

  handleChange: function (event) {
    var value = event.target.value;
    var color = this.props.fn(value);
    if (color !== null) {
      this.props.onChange(color.toHex());
    }
    this.setState({ value: value });
  },

  handleFocus: function () {
    this.setState({ isFocused: true });
  },

  handleBlur: function () {
    this.setState({ isFocused: false });
  },

  render: function () {
    return (
      /* jshint ignore: start */
      React.createElement("li", null, 
        React.createElement("label", null, this.props.label), 
        React.createElement("input", {
          value: this.state.value, 
          onFocus: this.handleFocus, 
          onBlur: this.handleBlur, 
          onChange: this.handleChange}
        )
      )
      /* jshint ignore: end */
    );
  }

});

module.exports = Input;


},{"../mixin/onchange.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/onchange.react.jsx","../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js","colr":"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/index.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/components/map.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');
var Colr = require('colr');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var classnames = require('classnames');

var clamp = require('../util/clamp');
var DraggableMixin = require('../mixin/draggable.react');
var OnChangeMixin = require('../mixin/onchange.react');

var Map = React.createClass({displayName: "Map",

  mixins: [
    DraggableMixin,
    OnChangeMixin,
    PureRenderMixin,
  ],

  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
  },

  updatePosition: function (clientX, clientY) {
    var rect = this.getDOMNode().getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = this.getScaledValue(x);
    y = this.getScaledValue(y);

    this.props.onChange(x, y);
  },

  render: function () {
    var classes = classnames({
      map: true,
      active: this.state.active,
    });

    classes += " " + this.props.className;

    return (
      /* jshint ignore: start */
      React.createElement("div", {
        className: classes, 
        onMouseDown: this.startUpdates, 
        onTouchStart: this.startUpdates
      }, 
        React.createElement("div", {className: "background", style: {
          backgroundColor: this.props.backgroundColor
        }}), 
        React.createElement("div", {className: "pointer", style: {
          left: this.getPercentageValue(this.props.x),
          bottom: this.getPercentageValue(this.props.y)
        }})
      )
      /* jshint ignore: end */
    );
  }

});

module.exports = Map;


},{"../mixin/draggable.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/draggable.react.jsx","../mixin/onchange.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/onchange.react.jsx","../util/clamp":"/Volumes/Home/Projects/react-colorpicker/lib/util/clamp.js","../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js","classnames":"/Volumes/Home/Projects/react-colorpicker/node_modules/classnames/index.js","colr":"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/index.js","react/lib/ReactComponentWithPureRenderMixin":"/Volumes/Home/Projects/react-colorpicker/node_modules/react/lib/ReactComponentWithPureRenderMixin.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/components/sample.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');
var Colr = require('colr');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var OnChangeMixin = require('../mixin/onchange.react');

var Sample = React.createClass({displayName: "Sample",

  mixins: [
    OnChangeMixin,
    PureRenderMixin,
  ],

  propTypes: {
    color: React.PropTypes.string.isRequired,
    origin: React.PropTypes.string.isRequired,
  },

  loadOrigin: function () {
    this.props.onChange(this.props.origin);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      React.createElement("div", {className: "sample"}, 
        React.createElement("div", {
          className: "current", 
          style: {background: this.props.color}}
        ), 
        React.createElement("div", {
          className: "origin", 
          style: {background: this.props.origin}, 
          onClick: this.loadOrigin}
        )
      )
      /* jshint ignore: end */
    );
  }

});

module.exports = Sample;


},{"../mixin/onchange.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/onchange.react.jsx","../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js","colr":"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/index.js","react/lib/ReactComponentWithPureRenderMixin":"/Volumes/Home/Projects/react-colorpicker/node_modules/react/lib/ReactComponentWithPureRenderMixin.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/components/slider.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var classnames = require('classnames');

var clamp = require('../util/clamp');
var DraggableMixin = require('../mixin/draggable.react');
var OnChangeMixin = require('../mixin/onchange.react');

var Slider = React.createClass({displayName: "Slider",

  mixins: [
    DraggableMixin,
    OnChangeMixin,
    PureRenderMixin,
  ],

  propTypes: {
    vertical: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number.isRequired,
  },

  updatePosition: function (clientX, clientY) {
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();

    var value;
    if (this.props.vertical) {
      value = (rect.bottom - clientY) / rect.height;
    } else {
      value = (clientX - rect.left) / rect.width;
    }

    value = this.getScaledValue(value);
    this.props.onChange(value);
  },

  render: function () {
    var classes = classnames({
      slider: true,
      vertical: this.props.vertical,
      horizontal: ! this.props.vertical
    });

    var styles = {};
    var attr = this.props.vertical ? 'bottom' : 'left';
    styles[attr] = this.getPercentageValue(this.props.value);

    return (
      /* jshint ignore: start */
      React.createElement("div", {
        className: classes, 
        onMouseDown: this.startUpdates, 
        onTouchStart: this.startUpdates
      }, 
        React.createElement("div", {className: "track"}), 
        React.createElement("div", {className: "pointer", style: styles})
      )
      /* jshint ignore: end */
    );
  }

});

module.exports = Slider;


},{"../mixin/draggable.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/draggable.react.jsx","../mixin/onchange.react":"/Volumes/Home/Projects/react-colorpicker/lib/mixin/onchange.react.jsx","../util/clamp":"/Volumes/Home/Projects/react-colorpicker/lib/util/clamp.js","../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js","classnames":"/Volumes/Home/Projects/react-colorpicker/node_modules/classnames/index.js","react/lib/ReactComponentWithPureRenderMixin":"/Volumes/Home/Projects/react-colorpicker/node_modules/react/lib/ReactComponentWithPureRenderMixin.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/mixin/draggable.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');

var clamp = require('../util/clamp');

var DraggableMixin = {

  propTypes: {
    max: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      max: 1
    };
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  componentDidMount: function () {
    document.addEventListener('mousemove', this.handleUpdate);
    document.addEventListener('touchmove', this.handleUpdate);
    document.addEventListener('mouseup', this.stopUpdates);
    document.addEventListener('touchend', this.stopUpdates);
  },

  componentWillUnmount: function () {
    document.removeEventListener('mousemove', this.handleUpdate);
    document.removeEventListener('touchmove', this.handleUpdate);
    document.removeEventListener('mouseup', this.stopUpdates);
    document.removeEventListener('touchend', this.stopUpdates);
  },

  startUpdates: function (e) {
    var coords = this.getPosition(e);
    this.setState({ active: true });
    this.updatePosition(coords.x, coords.y);
  },

  handleUpdate: function (e) {
    if (this.state.active) {
      e.preventDefault();
      var coords = this.getPosition(e);
      this.updatePosition(coords.x, coords.y);
    }
  },

  stopUpdates: function () {
    if (this.state.active) {
      this.setState({ active: false });
    }
  },

  getPosition : function (e) {
    if (e.touches) {
      e = e.touches[0];
    }

    return {
      x : e.clientX,
      y : e.clientY
    };
  },

  getPercentageValue : function (value) {
    return (value / this.props.max) * 100 + "%";
  },

  getScaledValue : function (value) {
    return clamp(value, 0, 1) * this.props.max;
  }

};

module.exports = DraggableMixin;


},{"../util/clamp":"/Volumes/Home/Projects/react-colorpicker/lib/util/clamp.js","../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/mixin/onchange.react.jsx":[function(require,module,exports){
'use strict';

var React = require('../util/react');

var noop = function () {};

var OnChangeMixin = {

  propTypes: {
    onChange : React.PropTypes.func,
  },

  getDefaultProps: function () {
    return {
      onChange: noop
    };
  }
};

module.exports = OnChangeMixin;


},{"../util/react":"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js"}],"/Volumes/Home/Projects/react-colorpicker/lib/util/clamp.js":[function(require,module,exports){
function clamp (val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

module.exports = clamp;


},{}],"/Volumes/Home/Projects/react-colorpicker/lib/util/react.js":[function(require,module,exports){
if ((typeof window !== 'undefined') && (typeof window.React !== 'undefined')) {
  module.exports = window.React;
} else {
  module.exports = require('react');
}


},{"react":false}],"/Volumes/Home/Projects/react-colorpicker/node_modules/classnames/index.js":[function(require,module,exports){
/*
  Copyright (c) 2015 Jed Watson.
  
  Licensed under the MIT License (MIT), see
  https://github.com/JedWatson/classnames/blob/master/LICENSE
*/

function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
}

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classnames', [], function() {
		return classNames;
	});
}

},{}],"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/index.js":[function(require,module,exports){
'use strict';


/*
 * DEPENDENCIES
 */

var convert = require('colr-convert');


/*
 * CONSTRUCTOR
 */

function Colr () {
  if ((this instanceof Colr) === false) { return new Colr(); }
  this._ = {};
}


/*
 * STATIC METHODS
 */

Colr.fromHex = function (hex) {
  return (new Colr()).fromHex(hex);
};

Colr.fromGrayscale = function (value) {
  return (new Colr()).fromGrayscale(value);
};

Colr.fromRgb = function (r, g, b) {
  return (new Colr()).fromRgb(r, g, b);
};

Colr.fromRgbArray = function (arr) {
  return (new Colr()).fromRgb(arr[0], arr[1], arr[2]);
};

Colr.fromRgbObject = function (obj) {
  return (new Colr()).fromRgb(obj.r, obj.g, obj.b);
};
Colr.fromHsl = function (h, s, l) {
  return (new Colr()).fromHsl(h, s, l);
};

Colr.fromHslArray = function (arr) {
  return (new Colr()).fromHsl(arr[0], arr[1], arr[2]);
};

Colr.fromHslObject = function (obj) {
  return (new Colr()).fromHsl(obj.h, obj.s, obj.l);
};

Colr.fromHsv = function (h, s, v) {
  return (new Colr()).fromHsv(h, s, v);
};

Colr.fromHsvArray = function (arr) {
  return (new Colr()).fromHsv(arr[0], arr[1], arr[2]);
};

Colr.fromHsvObject = function (obj) {
  return (new Colr()).fromHsv(obj.h, obj.s, obj.v);
};


/*
 * IMPORTERS
 */

// HEX

Colr.prototype.fromHex = function (input) {
  var value = convert.hex.rgb(input);
  this._ = { rgb: value };
  return this;
};

// GRAYSCALE

Colr.prototype.fromGrayscale = function (input) {
  input = clampByte(input);
  var value = convert.grayscale.rgb(input);
  this._ = { rgb: value };
  return this;
};

// RGB

Colr.prototype.fromRgb = function (r, g, b) {
  if (typeof(r) !== 'number' || typeof(g) !== 'number' || typeof(b) !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  var value = clampRgb(r, g, b);
  this._ = { rgb: value };
  return this;
};

Colr.prototype.fromRgbArray = function (arr) {
  return this.fromRgb(arr[0], arr[1], arr[2]);
};

Colr.prototype.fromRgbObject = function (obj) {
  return this.fromRgb(obj.r, obj.g, obj.b);
};

// HSL

Colr.prototype.fromHsl = function (h, s, l) {
  if (typeof(h) !== 'number' || typeof(s) !== 'number' || typeof(l) !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  this._ = { hsl: clampHsx(h, s, l) };
  return this;
};

Colr.prototype.fromHslArray = function (arr) {
  return this.fromHsl(arr[0], arr[1], arr[2]);
};

Colr.prototype.fromHslObject = function (obj) {
  return this.fromHsl(obj.h, obj.s, obj.l);
};

// HSV

Colr.prototype.fromHsv = function (h, s, v) {
  if (typeof(h) !== 'number' || typeof(s) !== 'number' || typeof(v) !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  this._ = { hsv: clampHsx(h, s, v) };
  return this;
};

Colr.prototype.fromHsvArray = function (arr) {
  return this.fromHsv(arr[0], arr[1], arr[2]);
};

Colr.prototype.fromHsvObject = function (obj) {
  return this.fromHsv(obj.h, obj.s, obj.v);
};


/*
 * EXPORTERS
 */

// HEX

Colr.prototype.toHex = function () {
  var cached = this._.hex;
  if (cached !== undefined) { return cached; }

  var input;
  var cachedFrom = this._.rgb;

  if (cachedFrom !== undefined) { input = cachedFrom; }
  else { input = this.toRawRgbArray(); }

  input[0] = Math.round(input[0]);
  input[1] = Math.round(input[1]);
  input[2] = Math.round(input[2]);

  var value = convert.rgb.hex(input);
  this._.hex = value;

  return value;
};

// GRAYSCALE

Colr.prototype.toGrayscale = function () {
  var cached = this._.grayscale;
  if (cached !== undefined) { return cached; }

  var input;
  var cachedFrom = this._.rgb;

  if (cachedFrom !== undefined) { input = cachedFrom; }
  else { input = this.toRawRgbArray(); }

  var value = convert.rgb.grayscale(input);
  this._.grayscale = value;
  return value;
};

// RGB

Colr.prototype.toRawRgbArray = function () {
  var cached = this._.rgb;
  if (cached !== undefined) { return cached; }

  var value;

  if ((value = this._.hsv) !== undefined) {
    value = convert.hsv.rgb(value);
  } else if ((value = this._.hsl) !== undefined) {
    value = convert.hsl.rgb(value);
  } else {
    throw new Error('No data to convert');
  }

  this._.rgb = value;
  return value;
};

Colr.prototype.toRawRgbObject = function () {
  var arr = this.toRawRgbArray();
  return { r: arr[0], g: arr[1], b: arr[2] };
};

Colr.prototype.toRgbArray = function () {
  var arr = this.toRawRgbArray();
  return [ Math.round(arr[0]), Math.round(arr[1]), Math.round(arr[2]) ];
};

Colr.prototype.toRgbObject = function () {
  var arr = this.toRgbArray();
  return { r: arr[0], g: arr[1], b: arr[2] };
};

// HSL

Colr.prototype.toRawHslArray = function () {
  var cached = this._.hsl;
  if (cached !== undefined) { return cached; }

  var value;

  if ((value = this._.hsv) !== undefined) {
    value = convert.hsv.hsl(value);
  } else if ((value = this._.rgb) !== undefined) {
    value = convert.rgb.hsl(value);
  } else {
    throw new Error('No data to convert');
  }

  this._.hsl = value;
  return value;
};

Colr.prototype.toRawHslObject = function () {
  var arr = this.toRawHslArray();
  return { h: arr[0], s: arr[1], l: arr[2] };
};

Colr.prototype.toHslArray = function () {
  var arr = this.toRawHslArray();
  return [ Math.round(arr[0]), Math.round(arr[1]), Math.round(arr[2]) ];
};

Colr.prototype.toHslObject = function () {
  var arr = this.toHslArray();
  return { h: arr[0], s: arr[1], l: arr[2] };
};

// HSV

Colr.prototype.toRawHsvArray = function () {
  var cached = this._.hsv;
  if (cached !== undefined) { return cached; }

  var value;

  if ((value = this._.hsl) !== undefined) {
    value = convert.hsl.hsv(value);
  } else if ((value = this._.rgb) !== undefined) {
    value = convert.rgb.hsv(value);
  } else {
    throw new Error('No data to convert');
  }

  this._.hsv = value;
  return value;
};

Colr.prototype.toRawHsvObject = function () {
  var arr = this.toRawHsvArray();
  return { h: arr[0], s: arr[1], v: arr[2] };
};

Colr.prototype.toHsvArray = function () {
  var arr = this.toRawHsvArray();
  return [ Math.round(arr[0]), Math.round(arr[1]), Math.round(arr[2]) ];
};

Colr.prototype.toHsvObject = function () {
  var arr = this.toHsvArray();
  return { h: arr[0], s: arr[1], v: arr[2] };
};


/*
 * MODIFIERS
 */

Colr.prototype.lighten = function (amount) {
  var hsl = this.toRawHslArray();
  hsl[2] = clampPercentage(hsl[2] + amount);
  this._ = { hsl: hsl };
  return this;
};

Colr.prototype.darken = function (amount) {
  var hsl = this.toRawHslArray();
  hsl[2] = clampPercentage(hsl[2] - amount);
  this._ = { hsl: hsl };
  return this;
};

/*
 * MISC
 */

Colr.prototype.clone = function () {
  var colr = new Colr();
  colr._.hex = this._.hex;
  colr._.grayscale = this._.grayscale;

  if (this._.rgb !== undefined) {
    colr._.rgb = this._.rgb.slice(0);
  }
  if (this._.hsv !== undefined) {
    colr._.hsv = this._.hsv.slice(0);
  }
  if (this._.hsl !== undefined) {
    colr._.hsl = this._.hsl.slice(0);
  }

  return colr;
};

/*
 * UTILS
 */

function clampPercentage (val) {
  return Math.max(Math.min(val, 100), 0);
}

function clampByte (byte) {
  return Math.max(Math.min(byte, 255), 0);
}

function clampRgb (r, g, b) {
  return [
    Math.max(Math.min(r, 255), 0),
    Math.max(Math.min(g, 255), 0),
    Math.max(Math.min(b, 255), 0),
  ];
}

function clampHsx (h, s, x) {
  return [
    Math.max(Math.min(h, 360), 0),
    Math.max(Math.min(s, 100), 0),
    Math.max(Math.min(x, 100), 0),
  ];
}


module.exports = Colr;

},{"colr-convert":"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/node_modules/colr-convert/index.js"}],"/Volumes/Home/Projects/react-colorpicker/node_modules/colr/node_modules/colr-convert/index.js":[function(require,module,exports){
'use strict';

module.exports = {
  grayscale: {
    rgb: grayscale2rgb
  },
  hex: {
    rgb: hex2rgb,
  },
  rgb: {
    hsl: rgb2hsl,
    hsv: rgb2hsv,
    hex: rgb2hex,
    grayscale: rgb2grayscale
  },
  hsl: {
    rgb: hsl2rgb,
    hsv: hsl2hsv,
  },
  hsv: {
    rgb: hsv2rgb,
    hsl: hsv2hsl,
  },
};

// convert a charcode to a hex val
function hexVal (c) {
  return (
    c < 58 ? c - 48 : // 0 - 9
    c < 71 ? c - 55 : // A - F
    c - 87            // a - f
  );
}

function hex2rgb (hex) {
  var i = hex[0] === '#' ? 1 : 0;
  var len = hex.length;

  if (len - i < 3) {
    throw new Error('hex input must be at least three chars long');
  }

  var r, g, b;

  var h1 = hexVal(hex.charCodeAt(0+i));
  var h2 = hexVal(hex.charCodeAt(1+i));
  var h3 = hexVal(hex.charCodeAt(2+i));

  if (len - i >= 6) {
    r = (h1 << 4) + h2;
    g = (h3 << 4) + hexVal(hex.charCodeAt(3+i));
    b = (hexVal(hex.charCodeAt(4+i)) << 4) + hexVal(hex.charCodeAt(5+i));
  } else {
    r = (h1 << 4) + h1;
    g = (h2 << 4) + h2;
    b = (h3 << 4) + h3;
  }

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error('hex input is invalid');
  }

  return [r, g, b];
}


function rgb2hex (rgb) {
  return '#' + (
    '000000' +
    ((rgb[0] << 16) +
     (rgb[1] << 8) +
      rgb[2]
    ).toString(16)
  ).slice(-6);
}

function rgb2hsl (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;

  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  var h, s, l;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  var h, s, v;

  if (max === 0) {
    s = 0;
  } else {
    s = (delta / max * 1000) / 10;
  }

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function hsl2rgb (hsl) {
  var h = hsl[0] / 360;
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;

  var r, g, b;

  if (s === 0) { // monochrome
    r = g = b = l;

  } else {
    var q = l < 0.5 ? l * (s + 1) : l + s - l * s;
    var p = 2 * l - q;
    var t;

    // red
    t = h + 1/3;
    if      (t < 0) { t += 1; }
    else if (t > 1) { t -= 1; }
    if      (t < 1/6)  { r = p + (q - p) * t * 6; }
    else if (t < 1/2 ) { r = q; }
    else if (t < 2/3 ) { r = p + (q - p) * (2/3 - t) * 6; }
    else               { r = p; }

    // green
    t = h;
    if      (t < 0) { t += 1; }
    else if (t > 1) { t -= 1; }
    if      (t < 1/6)  { g = p + (q - p) * t * 6; }
    else if (t < 1/2 ) { g = q; }
    else if (t < 2/3 ) { g = p + (q - p) * (2/3 - t) * 6; }
    else               { g = p; }

    // blue
    t = h - 1/3;
    if      (t < 0) { t += 1; }
    else if (t > 1) { t -= 1; }
    if      (t < 1/6)  { b = p + (q - p) * t * 6; }
    else if (t < 1/2 ) { b = q; }
    else if (t < 2/3 ) { b = p + (q - p) * (2/3 - t) * 6; }
    else               { b = p; }
  }

  return [r * 255, g * 255, b * 255];
}

function hsl2hsv(hsl) {
  var h = hsl[0];
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var sv, v;

  if (s === 0) {
    return [h, 0, l * 100];
  }

  if (l === 0) {
    return [h, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsv2rgb(hsv) {
  var h = hsv[0] / 60;
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;

  var hi = Math.floor(h) % 6;

  var f = h - Math.floor(h);
  var p = 255 * v * (1 - s);
  var q = 255 * v * (1 - (s * f));
  var t = 255 * v * (1 - (s * (1 - f)));
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0];
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var sl, l;

  if (s === 0) {
    return [h, 0, v * 100];
  }

  if (v === 0) {
    return [h, 0, 0];
  }

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function grayscale2rgb (value) {
  return [value, value, value];
}

function rgb2grayscale (rgb) {
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
}

},{}],"/Volumes/Home/Projects/react-colorpicker/node_modules/react/lib/ReactComponentWithPureRenderMixin.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule ReactComponentWithPureRenderMixin
*/

'use strict';

var shallowEqual = require("./shallowEqual");

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;

},{"./shallowEqual":"/Volumes/Home/Projects/react-colorpicker/node_modules/react/lib/shallowEqual.js"}],"/Volumes/Home/Projects/react-colorpicker/node_modules/react/lib/shallowEqual.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 */

'use strict';

/**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @return {boolean}
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var key;
  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key) &&
        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B's keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

module.exports = shallowEqual;

},{}]},{},["./lib/index.js"])("./lib/index.js")
});