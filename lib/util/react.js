if ((typeof window !== 'undefined') && (typeof window.React !== 'undefined')) {
  module.exports = window.React;
} else {
  module.exports = require('react');
}
