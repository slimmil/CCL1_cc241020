import { global } from '../modules/global.js'

class Background {

    constructor() {

        this.x = 0;
        this.speed = 50;

        this.image = new Image();
        this.image.src = './images/background.png';

        global.background.push(this);
    };

    update() {

        this.x -= this.speed * global.deltaTime;

        if (this.x <= -global.canvas.width) {
            this.x = 0;
        };
    };

    draw () {

        global.ctx.drawImage(this.image, this.x, 0, global.canvas.width, global.canvas.height);
        global.ctx.drawImage(this.image, this.x + global.canvas.width, 0, global.canvas.width, global.canvas.height);
    };
};

export { Background }