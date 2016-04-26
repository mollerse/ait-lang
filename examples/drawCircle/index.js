var interpret = require('../../src');

var result = interpret(`${__dirname}/circle.ait`);

var path = result.stack.join(' ');

console.log(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <svg width="500" height="500" viewBox="-150 -150 300 300">
      <path stroke="#000" fill="none" d="${path}"></path>
    </svg>
  </body>
</html>`);
