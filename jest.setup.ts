import '@testing-library/jest-dom';

// Highcharts が必要とする CSS.supports をモック
if (typeof CSS === 'undefined') {
  // @ts-expect-error: CSS is not defined in Node.js
  global.CSS = {};
}

if (typeof CSS.supports === 'undefined') {
  CSS.supports = () => true;
}
