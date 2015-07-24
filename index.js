var htmlparser = require("htmlparser2");
var entities = require("entities");

//list of block elements
var blockElements = ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

//this flag turns on/off the NewLines handler
// smartNewLines handler implies 
//    a) each html block elements on its line
//    b) \n written in source html are stripped away
//For the sake of retro-compatibility, this flag is set to false
// can be changed from the user by adding a parameter to the module's core function
var smartNewLines = false;

function walker(node, parameters, outerFont) {

  if (node.type === 'text') {
    parameters.text += entities.decodeHTML(node.data);

  } else if (node.type === 'tag' && node.children) {
    var innerFont;

    //flag for block elements
    var isBlock = blockElements.indexOf(node.name) > -1;

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

    //handle block elements to generate new line
    // this is the prepended \n
    if(smartNewLines && isBlock) parameters.text += '\n';


    // walk children
    node.children.forEach(function onEach(child) {
      parameters = walker(child, parameters, innerFont);
    });

    //handle block elements to generate new line
    // this is the appended \n
    if(smartNewLines && isBlock) parameters.text += '\n';


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

      } else if (node.name === 'i' || node.name === 'em') {
        parameters.attributes.unshift({
          type: Ti.UI.iOS.ATTRIBUTE_OBLIQUENESS,
          value: 0.25,
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

  //before returning paramenters, we need some cleaning on data
  // text -> need to reduce multiple consecutives instances on \n into one 
  //         it also strips spaces and tabs included in "new line"
  if(smartNewLines)  parameters.text = parameters.text.replace(/\n[\n\s\t\r]*\n/gm, '\n');

  return parameters;
}


/**
 * Module's core function 
 * 
 * @param  {string}   html               source html to be processed
 * @param  {Function} callback           callback function, in the form (err, result)
 * @param  {boolean}   useSmartNewLines  flag to activate the Smart New Lines behaviour, which treats html block elements as new-line elements. Set to false for retro-compatibility (default: false)
 */
module.exports = function(html, callback, useSmartNewLines) {

  //set module's parameter for using smartNewLines
  smartNewLines = Boolean(useSmartNewLines);

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
  
  // remove newlines
  html = html.replace(/[\r\n]+/gm, ' ').replace(/\s+/g, ' ');

  parser.parseComplete(html);

};
