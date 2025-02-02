import { global } from '../modules/global.js';

class BottomObstacle {

    constructor(x, y, width, gap) {
        this.name = 'BottomObstacle';
        this.active = true;

        this.x = x;
        this.y = y;
        this.width = width;
        this.gap = gap;

        this.speed = 100;

        this.capHeight = 20;
        this.middleHeight = 30; // Adjust accordingly

        // Load images
        this.pipeBottomCap = new Image();
        this.pipeBottomMiddle = new Image();
        this.pipeBottomEnd = new Image();

        this.pipeBottomCap.src = './images/obstacles/bottomObstacle-01.png';
        this.pipeBottomMiddle.src = './images/obstacles/bottomObstacle-02.png';
        this.pipeBottomEnd.src = './images/obstacles/bottomObstacle-03.png';

        global.allGameObjects.push(this);
        global.obstacles.push(this);
    }

    boxBounds() {
        return {
            'left': this.x, 
            'right': this.x + this.width,
            'top': this.y + this.gap,
            'bottom': global.canvas.height
        };
    }

    reactToCollision() {
       
    }

    update() {
        this.x -= this.speed * global.deltaTime;
    }

    draw() {
        let bottomY = this.y + this.gap;
        global.ctx.drawImage(this.pipeBottomCap, this.x, bottomY, this.width, this.capHeight);

        for (let i = bottomY + this.capHeight; i < global.canvas.height - this.capHeight; i += this.middleHeight) {
            global.ctx.drawImage(this.pipeBottomMiddle, this.x, i, this.width, this.middleHeight);
        }
        global.ctx.drawImage(this.pipeBottomEnd, this.x, global.canvas.height - this.capHeight, this.width, this.capHeight);
    }
}

export { BottomObstacle };
