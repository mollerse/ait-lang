module.exports = {
  'path': function(context) {
    var pathData = context.stack.join();
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'fill', 'none');
    path.setAttributeNS(null, 'stroke', '#000');
    path.setAttributeNS(null, 'd', pathData);

    context.canvas.appendChild(path);
  }
};
