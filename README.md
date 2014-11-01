HTML to Attributed String
=========================

[![Dependencies](https://david-dm.org/fokkezb/ti-html2as/status.svg?style=flat-square)](https://david-dm.org/fokkezb/ti-html2as#info=dependencies)
[![Dev Dependencies](https://david-dm.org/fokkezb/ti-html2as/dev-status.svg?style=flat-square)](https://david-dm.org/fokkezb/ti-html2as#info=devDependencies)

HTML to [Ti.UI.iOS.AttributedString](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.iOS.AttributedString) parser for [Titanium](http://appcelerator.com/titanium).

## Screencast

![screencast](screencast.gif)

## Usage
A packaged *CommonJS* module can be found via [Releases](https://github.com/fokkezb/ti-html2as/releases).

The module exports a single function that takes an HTML string and a callback to receive an error or [Ti.UI.iOS.AttributedString](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.iOS.AttributedString) object.

```
var html2as = require('nl.fokkezb.html2as');

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

## Example
The [example](example) folder includes a Titanium project demonstrating the module. To build the module and then run the example project use the included grunt tasks:

```
npm install
grunt
```

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/html2as/issues).


Credits
-------

* [@fb55](https://github.com/fb55) for [htmlparser2](https://github.com/fb55/htmlparser2)
* [@smclab](https://github.com/smclab/titaniumifier) for [titaniumifier](https://github.com/smclab/titaniumifier)


License
-------

This library, *ti-html2as*, is free software ("Licensed Software"); you can
redistribute it and/or modify it under the terms of the [GNU Lesser General
Public License](http://www.gnu.org/licenses/lgpl-2.1.html) as published by the
Free Software Foundation; either version 2.1 of the License, or (at your
option) any later version.

This library is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; including but not limited to, the implied warranty of MERCHANTABILITY,
NONINFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
Public License for more details.

You should have received a copy of the [GNU Lesser General Public
License](http://www.gnu.org/licenses/lgpl-2.1.html) along with this library; if
not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth
Floor, Boston, MA 02110-1301 USA
