var htmlparser = require("htmlparser2");

function walker(node, parameters, outerFont) {

  if (node.type === 'text') {
    parameters.text += node.data;

  } else if (node.type === 'tag' && node.children) {
    var innerFont;

    // clone font property from wrapping tags
    if (outerFont) {
      innerFont = {};
      outerFont.fontWeight && (innerFont.fontWeight = outerFont.fontWeight);
      outerFont.fontFamily && (innerFont.fontFamily = outerFont.fontFamily);
      outerFont.fontSize && (innerFont.fontSize = outerFont.fontSize);
    }

    // override font properties from this tag
    if (node.name === 'strong' || node.name === 'b') {
      innerFont || (innerFont = {});
      innerFont.fontWeight = 'bold';

    } else if (node.name === 'font' && node.attribs) {

      if (node.attribs.face) {
        innerFont || (innerFont = {});
        innerFont.fontFamily = node.attribs.face;
      }

      if (node.attribs.size) {
        innerFont || (innerFont = {});
        innerFont.fontSize = node.attribs.size;
      }
    }

    // save length before children
    var offset = parameters.text.length;

    // walk children
    node.children.forEach(function onEach(child) {
      parameters = walker(child, parameters, innerFont);
    });

    // calculate length of (grant)children text nodes
    var length = parameters.text.length - offset;

    // only apply attributes if we wrap text
    if (length > 0) {

      if (node.name === 'a' && node.attribs && node.attribs.href) {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_LINK,
          value: node.attribs.href,
          range: [offset, length]
        });

      } else if (node.name === 'u') {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
          value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
          range: [offset, length]
        });

      } else if (node.name === 'strike' || node.name === 'del' || node.name === 's') {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_STRIKETHROUGH_STYLE,
          value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
          range: [offset, length]
        });

      } else if (node.name === 'effect') {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_TEXT_EFFECT,
          value: Ti.UI.iOS.ATTRIBUTE_LETTERPRESS_STYLE,
          range: [offset, length]
        });

      } else if (node.name === 'kern' && node.attribs && node.attribs.value) {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_KERN,
          value: node.attribs.value,
          range: [offset, length]
        });

      } else if (node.name === 'expansion' && node.attribs && node.attribs.value) {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_EXPANSION,
          value: node.attribs.value,
          range: [offset, length]
        });

      } else if (node.name === 'font' && node.attribs && node.attribs.color) {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
          value: node.attribs.color,
          range: [offset, length]
        });
      }

      // if we have a font to set
      if (innerFont) {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_FONT,
          value: innerFont,
          range: [offset, length]
        });
      }
    }
  }

  return parameters;
}

module.exports = function(html, callback) {

  var parser = new htmlparser.Parser(new htmlparser.DomHandler(function(error, dom) {

    if (error) {
      callback(error);

    } else {

      // console.debug(dom);

      var parameters = walker({
        type: 'tag',
        children: dom
      }, {
        text: '',
        attributes: []
      });

      // console.log(parameters);

      var attr = Titanium.UI.iOS.createAttributedString(parameters);

      callback(null, attr);
    }
  }));

  parser.parseComplete(html);

};