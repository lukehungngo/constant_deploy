var blessed = require('blessed')
const shard = require("../backend/aggregator").shard

class Crossshard {
    constructor(screen) {
        this.screen = screen
        this.text
    }

    remove() {
        this.isDisplay = false
        if (!this.isDisplay) return
        this.screen.remove(this.text)
        this.screen.render()
    }

    display(id) {
        var self = this
        this.isDisplay = true
                        
        this.text = blessed.text({
            keys: true,
            vi: true,
            content: "",
            alwaysScroll:true,
            scrollable: true,
            scrollbar: {
              style: {
                bg: 'yellow'
              }
            }
        });
        this.text.setContent(shard[id].cspool)
        // Append our box to the screen.
        this.screen.append(this.text);
        this.screen.render()
    }
}

module.exports = Crossshard