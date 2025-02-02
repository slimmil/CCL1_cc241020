import { global } from '../modules/global.js'

class HoneyMeter {

    constructor(x, y, width, height) {

        this.active = true;

        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;

        global.meter.push(this);
    }

    draw() {

        let percentage = global.honeyCount / 10;

        global.ctx.fillStyle = 'Black';
        global.ctx.fillRect(12, 12, 302, 20);

        global.ctx.fillStyle = 'yellow';
        global.ctx.fillRect(this.x, this.y, this.width * percentage, this.height);
    };
};

export { HoneyMeter }