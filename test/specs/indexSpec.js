var proxyquire = require('proxyquire').noCallThru();

describe('html2as - standard functioinality -', function() {
  var html2as = null;

  beforeEach(function() {
    Ti = require('../spies/TiSpy')();
  });

  function init() {
    html2as = proxyquire('../../index', {});
  }

  afterEach(function() {
    delete Ti;
  });

  it('correctly parses known html tags to the correct AttributedString values - iOS - Ti 5.2.0', function() {
    Ti.version = '5.2.0';

    Ti.Platform.name = 'iPhone OS';

    init();

    Ti.UI.createAttributedString.and.callFake(function(parameters) {
      return parameters;
    });

    var callbackExecuted = false;
    var callback = function(err, result) {
      expect(err).toBeNull();
      expect(result).toEqual({
        text: 'Strong Text\nBold Text\nUnderlined Text\nEmphasised Text\nItalicised Text\nStruck (strike) Text\nDeleted Text\nStruck (s) Text\nArial Text\nFont size 12 Text\nRed Text\nAnchor\nLetterpress Text\nKerned Text\nExpanded Text',
        attributes: [{
          type: 20,
          value: '0.5',
          range: [194, 13]
        }, {
          type: 5,
          value: '10',
          range: [182, 11]
        }, {
          type: 13,
          value: '_UIKitNewLetterpressStyle',
          range: [165, 16]
        }, {
          type: 15,
          value: 'https://github.com/FokkeZB/ti-html2as',
          range: [158, 6]
        }, {
          type: 2,
          value: 'red',
          range: [149, 8]
        }, {
          type: 0,
          value: {
            fontSize: '12'
          },
          range: [131, 17]
        }, {
          type: 0,
          value: {
            fontFamily: 'Arial'
          },
          range: [120, 10]
        }, {
          type: 6,
          value: 1,
          range: [104, 15]
        }, {
          type: 6,
          value: 1,
          range: [91, 12]
        }, {
          type: 6,
          value: 1,
          range: [70, 20]
        }, {
          type: 19,
          value: 0.25,
          range: [54, 15]
        }, {
          type: 19,
          value: 0.25,
          range: [38, 15]
        }, {
          type: 7,
          value: 1,
          range: [22, 15]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [12, 9]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [0, 11]
        }]
      });

      callbackExecuted = true;
    };

    var html = '<strong>Strong Text</strong><br>' +
      '<b>Bold Text</b><br>' +
      '<u>Underlined Text</u><br>' +
      '<em>Emphasised Text</em><br>' +
      '<i>Italicised Text</i><br>' +
      '<strike>Struck (strike) Text</strike><br>' +
      '<del>Deleted Text</del><br>' +
      '<s>Struck (s) Text</s><br>' +
      '<font face="Arial">Arial Text</font><br>' +
      '<font size="12">Font size 12 Text</font><br>' +
      '<font color="red">Red Text</font><br>' +
      '<a href="https://github.com/FokkeZB/ti-html2as">Anchor</a><br>' +
      '<a color="red" href="https://github.com/FokkeZB/ti-html2as">Anchor Color</a><br>' +
      '<effect>Letterpress Text</effect><br>' +
      '<kern value="10">Kerned Text</kern><br>' +
      '<expansion value="0.5">Expanded Text</expansion>';

    html2as(html, callback);

    expect(callbackExecuted).toBeTruthy();
  });

  it('correctly parses known html tags to the correct AttributedString values - iOS - Ti 3.5.1', function() {
    Ti.version = '3.5.1';

    Ti.Platform.name = 'iPhone OS';

    init();

    Ti.UI.createAttributedString.and.callFake(function(parameters) {
      return parameters;
    });

    var callbackExecuted = false;
    var callback = function(err, result) {
      expect(err).toBeNull();
      expect(result).toEqual({
        text: 'Strong Text\nBold Text\nUnderlined Text\nEmphasised Text\nItalicised Text\nStruck (strike) Text\nDeleted Text\nStruck (s) Text\nArial Text\nFont size 12 Text\nRed Text\nAnchor\nLetterpress Text\nKerned Text\nExpanded Text',
        attributes: [{
          type: 20,
          value: '0.5',
          range: [194, 13]
        }, {
          type: 5,
          value: '10',
          range: [182, 11]
        }, {
          type: 13,
          value: '_UIKitNewLetterpressStyle',
          range: [165, 16]
        }, {
          type: 15,
          value: 'https://github.com/FokkeZB/ti-html2as',
          range: [158, 6]
        }, {
          type: 2,
          value: 'red',
          range: [149, 8]
        }, {
          type: 0,
          value: {
            fontSize: '12'
          },
          range: [131, 17]
        }, {
          type: 0,
          value: {
            fontFamily: 'Arial'
          },
          range: [120, 10]
        }, {
          type: 6,
          value: 1,
          range: [104, 15]
        }, {
          type: 6,
          value: 1,
          range: [91, 12]
        }, {
          type: 6,
          value: 1,
          range: [70, 20]
        }, {
          type: 19,
          value: 0.25,
          range: [54, 15]
        }, {
          type: 19,
          value: 0.25,
          range: [38, 15]
        }, {
          type: 7,
          value: 1,
          range: [22, 15]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [12, 9]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [0, 11]
        }]
      });

      callbackExecuted = true;
    };

    var html = '<strong>Strong Text</strong><br>' +
      '<b>Bold Text</b><br>' +
      '<u>Underlined Text</u><br>' +
      '<em>Emphasised Text</em><br>' +
      '<i>Italicised Text</i><br>' +
      '<strike>Struck (strike) Text</strike><br>' +
      '<del>Deleted Text</del><br>' +
      '<s>Struck (s) Text</s><br>' +
      '<font face="Arial">Arial Text</font><br>' +
      '<font size="12">Font size 12 Text</font><br>' +
      '<font color="red">Red Text</font><br>' +
      '<a href="https://github.com/FokkeZB/ti-html2as">Anchor</a><br>' +
      '<a color="red" href="https://github.com/FokkeZB/ti-html2as">Anchor Color</a><br>' +
      '<effect>Letterpress Text</effect><br>' +
      '<kern value="10">Kerned Text</kern><br>' +
      '<expansion value="0.5">Expanded Text</expansion>';

    html2as(html, callback);

    expect(callbackExecuted).toBeTruthy();
  });

  it('correctly parses known html tags to the correct AttributedString values - Android - Ti 5.2.0', function() {
    Ti.version = '5.2.0';

    Ti.Platform.name = 'Android OS';

    init();

    Ti.UI.createAttributedString.and.callFake(function(parameters) {
      return parameters;
    });

    var callbackExecuted = false;
    var callback = function(err, result) {
      expect(err).toBeNull();
      expect(result).toEqual({
        text: 'Strong Text\nBold Text\nUnderlined Text\nEmphasised Text\nItalicised Text\nStruck (strike) Text\nDeleted Text\nStruck (s) Text\nArial Text\nFont size 12 Text\nRed Text\nAnchor\nLetterpress Text\nKerned Text\nExpanded Text',
        attributes: [{
          type: 15,
          value: 'https://github.com/FokkeZB/ti-html2as',
          range: [158, 6]
        }, {
          type: 2,
          value: 'red',
          range: [149, 8]
        }, {
          type: 0,
          value: {
            fontSize: '12'
          },
          range: [131, 17]
        }, {
          type: 0,
          value: {
            fontFamily: 'Arial'
          },
          range: [120, 10]
        }, {
          type: 6,
          value: undefined,
          range: [104, 15]
        }, {
          type: 6,
          value: undefined,
          range: [91, 12]
        }, {
          type: 6,
          value: undefined,
          range: [70, 20]
        }, {
          type: 7,
          value: undefined,
          range: [22, 15]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [12, 9]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [0, 11]
        }]
      });

      callbackExecuted = true;
    };

    var html = '<strong>Strong Text</strong><br>' +
      '<b>Bold Text</b><br>' +
      '<u>Underlined Text</u><br>' +
      '<em>Emphasised Text</em><br>' +
      '<i>Italicised Text</i><br>' +
      '<strike>Struck (strike) Text</strike><br>' +
      '<del>Deleted Text</del><br>' +
      '<s>Struck (s) Text</s><br>' +
      '<font face="Arial">Arial Text</font><br>' +
      '<font size="12">Font size 12 Text</font><br>' +
      '<font color="red">Red Text</font><br>' +
      '<a href="https://github.com/FokkeZB/ti-html2as">Anchor</a><br>' +
      '<a color="red" href="https://github.com/FokkeZB/ti-html2as">Anchor Color</a><br>' +
      '<effect>Letterpress Text</effect><br>' +
      '<kern value="10">Kerned Text</kern><br>' +
      '<expansion value="0.5">Expanded Text</expansion>';

    html2as(html, callback);

    expect(callbackExecuted).toBeTruthy();
  });

  it('correctly parses known html tags to the correct AttributedString values - nested tags - Android - Ti 5.2.0', function() {
    Ti.version = '5.2.0';

    Ti.Platform.name = 'Android OS';

    init();

    Ti.UI.createAttributedString.and.callFake(function(parameters) {
      return parameters;
    });

    var callbackExecuted = false;
    var callback = function(err, result) {
      expect(err).toBeNull();
      expect(result).toEqual({
        text: 'Strong Text with some Italicised Text and some Underlined Text',
        attributes: [{
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [0, 62]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [47, 15]
        }, {
          type: 7,
          value: undefined,
          range: [47, 15]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [22, 15]
        }]
      });

      callbackExecuted = true;
    };

    var html = '<strong>Strong Text with some <i>Italicised Text</i> and some <u>Underlined Text</u></strong>';

    html2as(html, callback);

    expect(callbackExecuted).toBeTruthy();
  });
});

describe('html2as - custom functioinality -', function() {
  var html2as = null;

  beforeEach(function() {
    Ti = require('../spies/TiSpy')();
  });

  function init() {
    html2as = proxyquire('../../index', {});
  }

  afterEach(function() {
    delete Ti;
  });

  it('correctly parses known html tags and custom html tags to the correct AttributedString values - iOS - Ti 5.2.0', function() {
    Ti.version = '5.2.0';

    Ti.Platform.name = 'iPhone OS';

    init();

    Ti.UI.createAttributedString.and.callFake(function(parameters) {
      return parameters;
    });

    var customMatcher = function(node, parameters, outerFont, offset, length, ns) {
      if (node.type === 'tag' && node.name && node.name === 'h1') {
        parameters.attributes.unshift({
          type: ns.ATTRIBUTE_FOREGROUND_COLOR,
          value: 'red',
          range: [offset, length]
        });
        parameters.attributes.unshift({
          type: ns.ATTRIBUTE_FONT,
          value: {
            fontSize: 48,
            fontFamily: 'Arial'
          },
          range: [offset, length]
        });
      }

      return {
        parameters: parameters,
        continue: true
      };
    };

    var callbackExecuted = false;
    var callback = function(err, result) {
      expect(err).toBeNull();
      expect(result).toEqual({
        text: 'Strong Text\nBold Text\nUnderlined Text\nEmphasised Text\nItalicised Text\nStruck (strike) Text\nDeleted Text\nStruck (s) Text\nArial Text\nFont size 12 Text\nRed Text\nAnchor\nLetterpress Text\nKerned Text\nExpanded Text\nH1 Text',
        attributes: [{
          type: 0,
          value: {
            fontSize: 48,
            fontFamily: 'Arial'
          },
          range: [208, 7]
        }, {
          type: 2,
          value: 'red',
          range: [208, 7]
        }, {
          type: 20,
          value: '0.5',
          range: [194, 13]
        }, {
          type: 5,
          value: '10',
          range: [182, 11]
        }, {
          type: 13,
          value: '_UIKitNewLetterpressStyle',
          range: [165, 16]
        }, {
          type: 15,
          value: 'https://github.com/FokkeZB/ti-html2as',
          range: [158, 6]
        }, {
          type: 2,
          value: 'red',
          range: [149, 8]
        }, {
          type: 0,
          value: {
            fontSize: '12'
          },
          range: [131, 17]
        }, {
          type: 0,
          value: {
            fontFamily: 'Arial'
          },
          range: [120, 10]
        }, {
          type: 6,
          value: 1,
          range: [104, 15]
        }, {
          type: 6,
          value: 1,
          range: [91, 12]
        }, {
          type: 6,
          value: 1,
          range: [70, 20]
        }, {
          type: 19,
          value: 0.25,
          range: [54, 15]
        }, {
          type: 19,
          value: 0.25,
          range: [38, 15]
        }, {
          type: 7,
          value: 1,
          range: [22, 15]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [12, 9]
        }, {
          type: 0,
          value: {
            fontWeight: 'bold'
          },
          range: [0, 11]
        }]
      });

      callbackExecuted = true;
    };

    var html = '<strong>Strong Text</strong><br>' +
      '<b>Bold Text</b><br>' +
      '<u>Underlined Text</u><br>' +
      '<em>Emphasised Text</em><br>' +
      '<i>Italicised Text</i><br>' +
      '<strike>Struck (strike) Text</strike><br>' +
      '<del>Deleted Text</del><br>' +
      '<s>Struck (s) Text</s><br>' +
      '<font face="Arial">Arial Text</font><br>' +
      '<font size="12">Font size 12 Text</font><br>' +
      '<font color="red">Red Text</font><br>' +
      '<a href="https://github.com/FokkeZB/ti-html2as">Anchor</a><br>' +
      '<a color="red" href="https://github.com/FokkeZB/ti-html2as">Anchor Color</a><br>' +
      '<effect>Letterpress Text</effect><br>' +
      '<kern value="10">Kerned Text</kern><br>' +
      '<expansion value="0.5">Expanded Text</expansion><br>' +
      '<h1>H1 Text</h1>';

    html2as(html, callback, customMatcher);

    expect(callbackExecuted).toBeTruthy();
  });

  it('correctly parses custom html tags, without continuing, to the correct AttributedString values - iOS - Ti 5.2.0', function() {
    Ti.version = '5.2.0';

    Ti.Platform.name = 'iPhone OS';

    init();

    Ti.UI.createAttributedString.and.callFake(function(parameters) {
      return parameters;
    });

    var customMatcher = function(node, parameters, outerFont, offset, length, ns) {

      if (node.type === 'tag' && node.name && node.name !== 'h1') {
        parameters.attributes.unshift({
          type: ns.ATTRIBUTE_FOREGROUND_COLOR,
          value: 'red',
          range: [offset, length]
        });
      }

      return {
        parameters: parameters,
        continue: false
      };
    };

    var callbackExecuted = false;
    var callback = function(err, result) {
      expect(err).toBeNull();
      expect(result).toEqual({
        text: 'Strong Text\nBold Text\nUnderlined Text\nEmphasised Text\nItalicised Text\nStruck (strike) Text\nDeleted Text\nStruck (s) Text\nArial Text\nFont size 12 Text\nRed Text\nAnchor\nLetterpress Text\nKerned Text\nExpanded Text\nH1 Text',
        attributes: [{
          type: 2,
          value: 'red',
          range: [194, 13]
        }, {
          type: 2,
          value: 'red',
          range: [182, 11]
        }, {
          type: 2,
          value: 'red',
          range: [165, 16]
        }, {
          type: 2,
          value: 'red',
          range: [158, 6]
        }, {
          type: 2,
          value: 'red',
          range: [149, 8]
        }, {
          type: 2,
          value: 'red',
          range: [131, 17]
        }, {
          type: 2,
          value: 'red',
          range: [120, 10]
        }, {
          type: 2,
          value: 'red',
          range: [104, 15]
        }, {
          type: 2,
          value: 'red',
          range: [91, 12]
        }, {
          type: 2,
          value: 'red',
          range: [70, 20]
        }, {
          type: 2,
          value: 'red',
          range: [54, 15]
        }, {
          type: 2,
          value: 'red',
          range: [38, 15]
        }, {
          type: 2,
          value: 'red',
          range: [22, 15]
        }, {
          type: 2,
          value: 'red',
          range: [12, 9]
        }, {
          type: 2,
          value: 'red',
          range: [0, 11]
        }]
      });

      callbackExecuted = true;
    };

    var html = '<strong>Strong Text</strong><br>' +
      '<b>Bold Text</b><br>' +
      '<u>Underlined Text</u><br>' +
      '<em>Emphasised Text</em><br>' +
      '<i>Italicised Text</i><br>' +
      '<strike>Struck (strike) Text</strike><br>' +
      '<del>Deleted Text</del><br>' +
      '<s>Struck (s) Text</s><br>' +
      '<font face="Arial">Arial Text</font><br>' +
      '<font size="12">Font size 12 Text</font><br>' +
      '<font color="red">Red Text</font><br>' +
      '<a href="https://github.com/FokkeZB/ti-html2as">Anchor</a><br>' +
      '<a color="red" href="https://github.com/FokkeZB/ti-html2as">Anchor Color</a><br>' +
      '<effect>Letterpress Text</effect><br>' +
      '<kern value="10">Kerned Text</kern><br>' +
      '<expansion value="0.5">Expanded Text</expansion><br>' +
      '<h1>H1 Text</h1>';

    html2as(html, callback, customMatcher);

    expect(callbackExecuted).toBeTruthy();
  });

  it('throws an error for a custom matcher which doesn\'t return the required parameters - iOS - Ti 5.2.0', function() {
    Ti.version = '5.2.0';

    Ti.Platform.name = 'iPhone OS';

    init();

    Ti.UI.createAttributedString.and.callFake(function(parameters) {
      return parameters;
    });

    var customMatcher = function(node, parameters, outerFont, ns) {
      return false;
    };

    var callbackExecuted = false;
    var callback = function() {
      callbackExecuted = true;
    };

    var html = '<strong>Strong Text</strong><br>' +
      '<b>Bold Text</b><br>' +
      '<u>Underlined Text</u><br>' +
      '<em>Emphasised Text</em><br>' +
      '<i>Italicised Text</i><br>' +
      '<strike>Struck (strike) Text</strike><br>' +
      '<del>Deleted Text</del><br>' +
      '<s>Struck (s) Text</s><br>' +
      '<font face="Arial">Arial Text</font><br>' +
      '<font size="12">Font size 12 Text</font><br>' +
      '<font color="red">Red Text</font><br>' +
      '<a href="https://github.com/FokkeZB/ti-html2as">Anchor</a><br>' +
      '<a color="red" href="https://github.com/FokkeZB/ti-html2as">Anchor Color</a><br>' +
      '<effect>Letterpress Text</effect><br>' +
      '<kern value="10">Kerned Text</kern><br>' +
      '<expansion value="0.5">Expanded Text</expansion><br>' +
      '<h1>H1 Text</h1>';

    expect(function() {
      html2as(html, callback, customMatcher);
    }).toThrowError('customMatcher should return an object with parameters and continue properties defined');

    expect(callbackExecuted).toBeFalsy();
  });
});
