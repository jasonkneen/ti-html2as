var html2as = require('nl.fokkezb.html2as');

$.index.open();

html2as(
  '<font size="20">\n' +
  '<strong>strong</strong> or <b>b</b>\n' +
  '<u>u</u>\n' +
  '<strike>strike</strike> or <del>del</del> or <s>s</s>\n' +
  '<font face="AmericanTypewriter">font:face</font>\n' +
  '<font size="30">font:size</font>\n' +
  '<font color="red">font:color</font>\n' +
  '<font face="AmericanTypewriter" size="8" color="red">font:face+size+color</font>\n' +
  '<a href="test.html">a:href</a> (longtap)\n' +
  'and character entities: <strong>&amp;</strong> <em>&copy;</em> \n' +
  'Hall&ograve; <b>world</b> \n' +
  '\nNon-standard attributes:\n\n' +
  '<effect>effect</effect>\n' +
  '<kern value="10">kern:value</kern>\n' +
  '<expansion value="0.5">expansion:value</expansion>\n' +
  '</font>',
  function(err, as) {

    if (err) {
      console.error(err);

    } else {
      $.basicLabel.attributedString = as;
    }
  });

html2as(
  '<font size="17">Hello <font color=red>Red</font> World</font>',
  function(err, as) {

    if (err) {
      console.error(err);

    } else {
      $.listViewSection.setItems([{
        label: {
          attributedString: as
        }
      }]);
    }
  });

function onLink(e) {
  alert('Longtap on link to: ' + e.url);
}
