var html2as = require('html2as');

var win = Ti.UI.createWindow({
  title: 'Basic',
  backgroundColor: 'white'
});

var view = Ti.UI.createScrollView({
  width: Ti.UI.FILL,
  height: Ti.UI.SIZE
});

win.add(view);

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
  '\nNon-standard attributes:\n\n' +
  '<effect>effect</effect>\n' +
  '<kern value="10">kern:value</kern>\n' +
  '<expansion value="0.5">expansion:value</expansion>\n' +
  '</font>', function(err, as) {

    if (err) {
      console.error(err);

    } else {

      var label = Titanium.UI.createLabel({
        left: 20,
        right: 20,
        attributedString: as
      });

      label.addEventListener('link', function(e) {
        alert('Longtap on link to: ' + e.url);
      });

      view.add(label);

    }

  });

win.open();

var tab = Ti.UI.createTab({
  title: 'Basic',
  window: win
});

module.exports = tab;