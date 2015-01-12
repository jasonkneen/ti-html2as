var html2as = require('nl.fokkezb.html2as');

$.applyProperties = function applyProperties(props) {

  if (props.html) {
    $.html = props.html;
  }

  $.label.applyProperties(props);
};

$.on = $.addEventListener = function(name, callback) {
  return $.label.addEventListener(name, callback);
};

$.off = $.removeEventListener = function(name, callback) {
  return $.label.removeEventListener(name, callback);
};

$.trigger = $.fireEvent = function(name, e) {
  return $.label.fireEvent(name, e);
};

$.setHtml = function setHtml(html) {

  $.label.html = html;

  if (OS_IOS) {
    html2as(html, function handle(err, as) {

      if (err) {
        console.error('[nl.fokkezb.html2as.widget] ' + err);

      } else {
        $.label.attributedString = as;
      }
    });
  }

};

$.getHtml = function getHtml() {
  return $.label.html;
};

Object.defineProperty($, 'html', {
  get: $.getHtml,
  set: $.setHtml
});

$.applyProperties(arguments[0] || {});