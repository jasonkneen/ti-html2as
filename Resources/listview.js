var html2as = require('html2as');

var win = Ti.UI.createWindow({
  title: 'ListView',
  backgroundColor: 'white'
});

html2as(
  'Hello <b>Bold</b> World', function(err, as) {

    if (err) {
      console.error(err);

    } else {

      var listview = Ti.UI.createListView({
        defaultItemTemplate: 'default',
        templates: {
          default: {
            childTemplates: [{
              type: 'Ti.UI.Label',
              bindId: 'label'
            }]
          }
        },
        sections: [Ti.UI.createListSection({
          items: [{
            label: {
              attr: as
            }
          }]
        })]
      });

      win.add(listview);

    }

  });

var tab = Ti.UI.createTab({
  title: 'ListView',
  window: win
});

module.exports = tab;