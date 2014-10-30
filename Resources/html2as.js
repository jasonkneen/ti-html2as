var htmlparser = require("./htmlparser");

function walker(node, parameters) {

  if (node.type === 'text') {
    parameters.text += node.data;

  } else {

    var offset = parameters.text.length;

    if (node.children) {
      node.children.forEach(function onEach(child) {
        parameters = walker(child, parameters);
      });
    }

    var length = parameters.text.length - offset;

    if (node.type === 'tag') {

      if (node.name === 'strong') {
        parameters.attributes.push({
          type: Ti.UI.iOS.ATTRIBUTE_FONT,
          value: {
            fontWeight: 'bold'
          },
          range: [offset, length]
        });

      } else if (node.name === 'u') {
        parameters.attributes.push({
          type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
          value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
          range: [offset, length]
        });

      } else if (node.name === 'font') {

        if (node.attributes) {

          if (node.attributes.color) {
            parameters.attributes.push({
              type: Ti.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
              value: node.attributes.color,
              range: [offset, length]
            });
          }

          if (node.attributes.face) {
            parameters.attributes.push({
              type: Ti.UI.iOS.ATTRIBUTE_FONT,
              value: {
                fontFamily: node.attributes.face
              },
              range: [offset, length]
            });
          }
        }

      }
    }
  }

  return parameters;
}

module.exports = function(html, callback) {

  var parser = new htmlparser.Parser(new htmlparser.HtmlBuilder(function(error, dom) {

    if (error) {
      callback(error);

    } else {

      console.debug(dom);

      var parameters = walker({
        children: dom
      }, {
        text: '',
        attributes: []
      });

      console.log(parameters);

      var attr = Titanium.UI.iOS.createAttributedString(parameters);

      callback(null, attr);
    }
  }));

  parser.parseComplete(html);

};