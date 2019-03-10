var blessed = require('blessed')


var screen = blessed.screen({
  smartCSR: true
})

const Home = require("./draw/home")
const home = new Home(screen)



screen.key(['C-c'], function (ch, key) {
  return process.exit(0)
})
var mapscreen = [
  [['C-`'], "home"],
  [['C','1'], "blank"],
]

mapscreen.forEach(x => {
  screen.key(x[0], function (ch, key) {
    switchScreen(x[1])
  })
})

function switchScreen(screenName) {
  removeAllScreen()

  switch (screenName) {
    case "home":
      home.display()
      break
    case "blank":
      // home.display()
      break
    default:
      home.display()
  }
}

function removeAllScreen(){
  home.remove()
}

switchScreen("home")