const {JSWord, nullary} = require('../runtime/interfaces');

const fillRect = JSWord(function(x, y, width, height) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.fillRect(x, y, width, height);
});
fillRect.produces(0);

const translate = JSWord(function(x, y) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.translate(x, y);
});
translate.produces(0);

const lineWidth = JSWord(function(width) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.lineWidth = width;
});
lineWidth.produces(0);

const globalAlpha = JSWord(function(alpha) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.globalAlpha = alpha;
});
globalAlpha.produces(0);

const strokeStyle = JSWord(function(style) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.strokeStyle = style;
});
strokeStyle.produces(0);

const fillStyle = JSWord(function(style) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.fillStyle = style;
});
fillStyle.produces(0);

const beginPath = JSWord(function() {
  const {ctx} = arguments[arguments.length - 1];
  ctx.beginPath();
});
beginPath.produces(0);

const quadraticCurveTo = JSWord(function([x, y], [cx, cy]) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.quadraticCurveTo(x, y, cx, cy);
});
quadraticCurveTo.produces(0);

const moveTo = JSWord(function([x, y]) {
  const {ctx} = arguments[arguments.length - 1];
  ctx.moveTo(x, y);
});
moveTo.produces(0);

const closePath = JSWord(function() {
  const {ctx} = arguments[arguments.length - 1];
  ctx.closePath();
});
closePath.produces(0);

const stroke = JSWord(function() {
  const {ctx} = arguments[arguments.length - 1];
  ctx.stroke();
});
stroke.produces(0);

const height = JSWord(function() {
  const {canvas} = arguments[arguments.length - 1];
  return canvas.height;
});
height.produces(1);

const width = JSWord(function() {
  const {canvas} = arguments[arguments.length - 1];
  return canvas.width;
});
width.produces(1);

module.exports = {
  '<height': height,
  '<width': width,
  fillRect,
  translate,
  lineWidth,
  globalAlpha,
  strokeStyle,
  fillStyle,
  beginPath,
  quadraticCurveTo,
  moveTo,
  closePath,
  stroke
};
