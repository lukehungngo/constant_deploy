var blessed = require('blessed')

var screen = blessed.screen({
  smartCSR: true
})

const Home = require('./draw/home')
const Text = require('./draw/text')
const Crossshard = require('./draw/crossshard')

const home = new Home(screen)
const text = new Text(screen)
const crossshard = new Crossshard(screen)

screen.key(['C-c'], function (ch, key) {
  return process.exit(0)
})
var mapscreen = [[['escape'], 'home'], [['1'], 'blank']]

mapscreen.forEach(x => {
  screen.key(x[0], function (ch, key) {
    screen.switchScreen(x[1])
  })
})

screen.switchScreen = function (screenName, nodeType, id) {
  screen.removeAllScreen()

  switch (screenName) {
    case 'home':
      home.display()
      break
    case 'crossshard':
      console.log('show cross shard', id)
      crossshard.display(id)
      break
    case 'blank':
      // home.display()
      break
    default:
      home.display()
  }
}

screen.removeAllScreen = function () {
  home.remove()
}

screen.switchScreen('home')
