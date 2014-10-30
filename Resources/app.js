var html2as = require('html2as');

var win = Titanium.UI.createWindow({
  backgroundColor: '#ddd',
});

html2as('hiero <strong color="red">vet</strong> en daaro <u>underline</u> en <font color="red" face="AmericanTypewriter">rood</font> maar een <a href="test.html">link</a> moet ook kunnen.', function(err, as) {

  if (err) {
    console.error(err);

  } else {

    var label = Titanium.UI.createLabel({
      left: 20,
      right: 20,
      height: Titanium.UI.SIZE,
      attributedString: as
    });

    label.addEventListener('link', function(e) {
      Ti.API.info(JSON.stringify(e));
    });

    win.add(label);

  }

});

win.open();
