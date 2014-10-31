# HTML to Attributed String (HTML2AS)

This is a sample [Titanium](http://appcelerator.com/titanium) project for - and including the - [html2as.js](Resources/html2as.js) CommonJS module.

Use this module to convert basic HTML to a [Ti.UI.iOS.AttributedString](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.iOS.AttributedString) you can use in a Label, TextField or TextArea.

## Screencast

![screencast](screencast.gif)

## Usage

```
var html2as = require('html2as');

html2as(
	'<font size="17" face="AmericanTypewriter">Hello <b>Bold</b> <a href="http://tidev.io">World</a></font>',
	function(err, as) {

		if (err) {
			console.error(err);

		} else {

			var label = Titanium.UI.createLabel({
				attributedString: as
			});

			label.addEventListener('link', function(e) {
				alert('Longtap on link to: ' + e.url);
			});

			view.add(label);
		}
	}
);
```

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/html2as/issues).

## License

Distributed under [MIT License](LICENSE).