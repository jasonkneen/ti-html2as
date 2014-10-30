var html2as = require('html2as');

var win = Titanium.UI.createWindow({
  backgroundColor: '#ddd',
});

html2as('hiero <strong color="red">vet</strong> en daaro <u>underline</u> en <font color="red" face="AmericanTypewriter">rood</font>', function(err, as) {

  if (err) {
    console.error(err);

  } else {

    win.add(Titanium.UI.createLabel({
      left: 20,
      right: 20,
      height: Titanium.UI.SIZE,
      attributedString: as
    }));

  }

});

win.open();