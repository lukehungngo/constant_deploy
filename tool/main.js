var blessed = require('blessed')
var beaconData = require('./data/beacon')
var shardData = require('./data/shard')
var contrib = require('blessed-contrib')

var screen = blessed.screen({
  smartCSR: true
})
screen.title = 'Constant Monitor Backend'

screen.key(['C-c'], function (ch, key) {
  return process.exit(0)
})

var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })

// grid.set(row, col, rowSpan, colSpan, obj, opts)
var beaconTable = grid.set(0, 0, 3, 12, contrib.table, {
  pad: 4,
  keys: true,
  interactive: true,
  columnWidth: [20, 8, 8 , 8, 20]
})
var shardTable = grid.set(3, 0, 9, 12, contrib.table, {
  pad: 4,
  keys: true,
  interactive: true,
  columnWidth: [20, 8, 8, 8, 14, 8, 14]
})

// var beaconTable = contrib.table({
//   keys: true,
//   fg: 'green',
//   selectedFg: 'white',
//   selectedBg: 'blue',
//   interactive: true,
//    label: 'Nodes',
//   width: '100%',
//   height: '30%',
//   border: { type: 'line', fg: 'cyan' },
//   columnSpacing: 10, // in chars
//   columnWidth: [16, 12] /* in chars */
// })

// allow control the table with the keyboard
// beaconTable.focus()

screen.append(beaconTable)
screen.append(shardTable)

screen.render()

setInterval(() => {
  shardTable.setData(shardData.getData())
  beaconTable.setData(beaconData.getData())
  // box.setContent('Even d\niffe\nrent\nsdsadas\nEven different\nsdsadas\nEven different\nsdsadas\n');
  screen.render()
}, 1000)
