var beaconData = require('../data/beacon')
var shardData = require('../data/shard')
var contrib = require('blessed-contrib')
var backendData = require('../backend/aggregator')
var backend = require('../backend/backend')
var { spawn } = require('child_process')

class HomeScreen {
  constructor (screen) {
    this.screen = screen
    this.isDisplay = false
    this.beaconTable
    this.shardTable
    this.elFocus = ''

    var self = this
    this.screen.key(['C-right'], function (ch, key) {
      if (!self.isDisplay) return
      self.screen.focusNext()
      self.screen.render()
    })

    this.screen.key(['C-left'], function (ch, key) {
      if (!self.isDisplay) return
      self.screen.focusPrevious()
    })

    this.screen.key(['3'], function (ch, key) {
      if (!self.isDisplay) return
      if (self.elFocus == 'shard') {
        self.screen.switchScreen('crossshard', "shard", self.shardTable.rows.selected)
      }
    })

    this.screen.key(['b'], function (ch, key) {
      if (!self.isDisplay) return
      if (self.elFocus == 'shard') {
        self.screen.switchScreen('shardBlock', "shard", self.shardTable.rows.selected)
      }
    })

    this.screen.key(['C-l'], async (ch, key) => {
      if (!this.isDisplay) return
      if (this.elFocus == 'beacon') {
        let logs = await backend.RetrieveLogs(
          backendData['beacon'][this.beaconTable.rows.selected].IP,
          'beacon' + this.beaconTable.rows.selected,
          backendData.key
        )
        require('fs').writeFileSync(
          'logs/beacon' + this.beaconTable.rows.selected,
          logs
        )
      } else {
        let shardInfo = backendData['shard'][this.shardTable.rows.selected]
        let logs = await backend.RetrieveLogs(
          shardInfo.IP,
          shardInfo.name,
          backendData.key
        )
        require('fs').writeFileSync('logs/' + shardInfo.name, logs)
      }
    })
  }

  remove () {
    this.isDisplay = false
    this.beaconTable && this.screen.remove(this.beaconTable)
    this.shardTable && this.screen.remove(this.shardTable)
    this.screen.render()
  }

  display () {
    var self = this
    this.isDisplay = true
    this.screen.title = 'Constant Monitor Backend'

    var grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen })

    // grid.set(row, col, rowSpan, colSpan, obj, opts)
    this.beaconTable = grid.set(0, 0, 4, 12, contrib.table, {
      pad: 4,
      keys: true,
      interactive: true,
      selectedBg: 'none',
      columnWidth: [25, 8, 8, 8, 15, 20]
    })

    this.shardTable = grid.set(4, 0, 8, 12, contrib.table, {
      pad: 4,
      keys: true,
      interactive: true,
      selectedBg: 'none',
      columnWidth: [25, 8, 8, 8, 14, 8, 8, 50, 8, 14]
    })

    this.beaconTable.rows.on('focus', data => {
      this.beaconTable.rows.style.selected.fg = 'white'
      this.shardTable.rows.style.selected.fg = 'green'
      this.elFocus = 'beacon'
    })

    this.shardTable.rows.on('focus', data => {
      this.shardTable.rows.style.selected.fg = 'white'
      this.beaconTable.rows.style.selected.fg = 'green'
      this.elFocus = 'shard'
    })

    this.beaconTable.rows.on('select', function (a, b) {})

    this.shardTable.rows.on('select', function (a, b) {})

    this.screen.append(this.beaconTable)
    this.screen.append(this.shardTable)
    this.shardTable.focus()
    this.screen.render()

    let loop = setInterval(() => {
      if (!this.isDisplay) {
        return clearInterval(loop)
      }
      this.screen.render()
    }, 500)

    setInterval(() => {
      this.shardTable.setData(shardData.getShardTableData())
      this.beaconTable.setData(beaconData.getBeaconTableData())
    }, 1000)
  }

  async showLogs (nodeType, index) {}
}

module.exports = HomeScreen
