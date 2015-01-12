# HTML to Attributed String Widget

This widget wraps the [HTML to Attributed String Module](http://gitt.io/component/nl.fokkezb.html2as) so you can easily use it in Alloy instead of a `<Label />` for cross-browser support for the originally Android-only `html` attribute.

## Get it [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/nl.fokkezb.html2as.widget)

Install via [gitTio](http://gitt.io/component/nl.fokkezb.html2as.widget):

	$ gittio install nl.fokkezb.html2as.widget

Or download a [release](https://github.com/FokkeZB/nl.fokkezb.html2as.widget/releases), extract it to your app's `app/widgets/nl.fokkezb.html2as.widget` folder and add the dependency to your `config.json`:

	{
		..
		"dependencies": {
		    "nl.fokkezb.html2as.widget": "*"
		    ..
		  }
	}
	
## Use it

**index.xml**

	<Alloy>
		<Window>
			<Widget id="h2a" src="nl.fokkezb.html2as.widget"
				html="<b>Hi</b> <a href='http://google.com'>Google</a>"
				onLink="onLinkHandler"
			/>
		</Window>
	</Alloy>

Of course you can also set any property for the widget via `index.tss`.
	
**index.js**

	function onLinkHandler(e) {
		alert(e.url);
		
		$.h2a.html = '<b>Bye</b> Google!';
	}
	
## API

### on/addEventListener()

Add an event-listener to the label.

### off/removeEventListener()

Remove an event-listener from the label.

### trigger/fireEvent()

Fire an event on the label.

### setHtml()

Set the HTML (on iOS parsed to Attributed String).

### getHtml()

Get the HTML.

### applyProperties()

Apply properties to the label

### html

Set or get the HTML property (on iOS parsed to Attributed String).

## License

	The MIT License (MIT)
	
	Copyright (c) 2015 Fokke Zandbergen
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.