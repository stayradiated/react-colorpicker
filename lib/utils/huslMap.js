var fs = require('fs');

var map = [
  fs.readFileSync(__dirname + '/../../maps/husl/0.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/1.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/2.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/3.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/4.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/5.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/6.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/7.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/8.jpg', 'base64'),
  fs.readFileSync(__dirname + '/../../maps/husl/9.jpg', 'base64')
];

module.exports = map;
