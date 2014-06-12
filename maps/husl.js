var fs = require('fs');
var husl = require('husl');
var Jpeg = require('jpeg').Jpeg;

var width = 400;
var height = 400;
var steps = 100;

for (var i = 0; i < steps; i++) {
  var rgb = []; 

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var hue = (x / width) * 360;
      var sat = (1 - (y / height)) * 100;
      var light = (i / steps) * 100;

      var color = husl.toRGB(hue, sat, light);
      rgb.push(Math.round(color[0] * 255));
      rgb.push(Math.round(color[1] * 255));
      rgb.push(Math.round(color[2] * 255));
    }
  }

  var jpeg = new Jpeg(new Buffer(rgb), width, height, 'rgb');
  var image = jpeg.encodeSync();
  fs.writeFile(__dirname + '/husl/' + i + '.jpg', image);
}
