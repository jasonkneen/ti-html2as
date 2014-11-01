(function(global) {

  var tabgroup = Ti.UI.createTabGroup({
    tabs: [
      require('basic'),
      require('listview')
    ]
  });

  tabgroup.open();

})(this);