var beaconData = require('../data/beacon')
var shardData = require('../data/shard')
var contrib = require('blessed-contrib')


class HomeScreen {
    constructor(screen) {
        this.screen = screen
        this.isDisplay = false
        this.beaconTable
        this.shardTable
        var self = this
        this.screen.key(['C-right'], function (ch, key) {
            if (!self.isDisplay) return
            self.screen.focusNext();
            self.screen.render();
        })

        this.screen.key(['C-left'], function (ch, key) {
            if (!self.isDisplay) return
            self.screen.focusPrevious()
        })

    }

    remove() {
        this.isDisplay = false
        this.beaconTable && this.screen.remove(this.beaconTable)
        this.shardTable && this.screen.remove(this.shardTable)
        this.screen.render()
    }

    display() {
        this.isDisplay = true
        this.screen.title = 'Constant Monitor Backend'

        var grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen })

        // grid.set(row, col, rowSpan, colSpan, obj, opts)
        this.beaconTable = grid.set(0, 0, 3, 12, contrib.table, {
            pad: 4,
            keys: true,
            interactive: true,
            selectedBg: 'none',
            columnWidth: [25, 8, 8, 8, 20]
        })

        this.shardTable = grid.set(3, 0, 9, 12, contrib.table, {
            pad: 4,
            keys: true,
            interactive: true,
            selectedBg: 'none',
            columnWidth: [25, 8, 8, 8, 14, 8, 14]
        })
        
        
        

        this.screen.append(this.beaconTable)
        this.screen.append(this.shardTable)
        this.beaconTable.focus()
        this.screen.render()

        let loop = setInterval(() => {
            if (!this.isDisplay) {
                return clearInterval(loop)
            }
            this.screen.render()
        }, 500)

        setInterval(() => {
            this.shardTable.setData(shardData.getData())
            this.beaconTable.setData(beaconData.getData())
        }, 1000)

    }
}

module.exports = HomeScreen