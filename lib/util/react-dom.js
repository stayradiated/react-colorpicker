if ((typeof window !== 'undefined') && (typeof window.ReactDOM !== 'undefined')) {
  module.exports = window.ReactDOM;
} else {
  module.exports = require('react-dom');
}
