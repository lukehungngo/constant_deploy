var blockData = require('../data/shard')
var contrib = require('blessed-contrib')

class ShardBlock {
  constructor (screen) {
    this.screen = screen
    this.isDisplay = false
    this.blockTable
  }

  remove () {
    this.isDisplay = false
    this.blockTable && this.screen.remove(this.blockTable)
    this.screen.render()
  }

  display (id) {
    var self = this
    this.isDisplay = true
    this.screen.title = 'Shard Block'
    
    this.blockTable = contrib.table({
      keys: true,
      interactive: true,
      selectedBg: 'none',
      columnWidth: [25, 8,8, 8, 8,8],
      border: {
        type: 'line',
        fg: 'cyan'
      },
      label: blockData.getAllData()[id].name
    })

    this.screen.append(this.blockTable)
    this.blockTable.focus()
    this.screen.render()

    let loop = setInterval(() => {
      if (!this.isDisplay) {
        return clearInterval(loop)
      }
      this.blockTable.setData(blockData.getBlockData(id) )
      this.screen.render()
    }, 500)
  }
}

module.exports = ShardBlock
