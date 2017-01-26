const {join} = require('path');

function p(relative) {
  return join(__dirname, relative);
}

module.exports = {
  'name': 'my-font',
  'alias': 'my-font',
  'dir': p('images'),
  'version': '2.0.0',
  'groups': [
    {
      'name': 'group1',
      'dir': p('images/group1'),
      'icons': [
        {
          'name': 'replay',
          'file': p('images/group1/replay.svg'),
          'unicode': ['replay']
        }
      ]
    },
    {
      'name': 'group2',
      'dir': p('images/group2'),
      'icons': [
        {
          'name': 'pause',
          'file': p('images/group2/pause.svg'),
          'unicode': ['pause']
        },
        {
          'name': 'play',
          'file': p('images/group2/play.svg'),
          'unicode': ['play']
        },
        {
          'name': 'stop',
          'file': p('images/group2/stop.svg'),
          'unicode': ['stop']
        }
      ]
    }
  ]
};