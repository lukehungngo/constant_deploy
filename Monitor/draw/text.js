var blessed = require('blessed')
class Text {
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

    display(content) {
        var self = this
        this.isDisplay = true
        
        this.text = blessed.line({
            keys: true,
            vi: true,
            alwaysScroll:true,
            scrollable: true,
            scrollbar: {
              style: {
                bg: 'yellow'
              }
            }
        });

        for (let i = 0; i < 200; i++) {
            this.text.insertLine(i, 'texting ');
            this.screen.render();
        }
        // Append our box to the screen.
        this.screen.append(this.text);
        this.screen.render()
    }
}

module.exports = Text