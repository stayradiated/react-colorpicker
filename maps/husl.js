var fs = require('fs');
var husl = require('husl');
var jpeg = require('jpeg-js');

var width = 360;
var height = 200;
var groups = 10;
var images = 10;

for (var i = 0; i < images; i++) {
  var data = []; 

  for (var j = 0; j < groups; j++) {
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var hue = (x / width) * 360;
        var sat = (1 - (y / height)) * 100;
        var light = (i * 10) + j;

        var color = husl.toRGB(hue, sat, light);
        data.push(
          Math.round(color[0] * 255),
          Math.round(color[1] * 255),
          Math.round(color[2] * 255),
          0
        );
      }
    }
  }

  var image = jpeg.encode({
    data: data,
    width: width,
    height: height * groups
  }, 70);

  console.log((i+1) + '/' + images);
  fs.writeFileSync(__dirname + '/husl/' + i + '.jpg', image.data);
}
