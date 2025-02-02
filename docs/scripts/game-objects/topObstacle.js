import { global } from '../modules/global.js';

class TopObstacle {

    constructor(x, y, width) {
        this.name = 'TopObstacle';
        this.active = true;

        this.x = x;
        this.y = y;
        this.width = width;
        
        this.speed = 100;

        this.capHeight = 20;
        this.middleHeight = 30; 

        this.pipeTopCap = new Image();
        this.pipeTopMiddle = new Image();
        this.pipeTopEnd = new Image();

        this.pipeTopCap.src = './images/obstacles/topObstacle-01.png'; 
        this.pipeTopMiddle.src = './images/obstacles/topObstacle-02.png'; 
        this.pipeTopEnd.src = './images/obstacles/topObstacle-03.png'; 

        global.allGameObjects.push(this);
        global.obstacles.push(this);
    }

    boxBounds() {
        return {
            'left': this.x, 
            'right': this.x + this.width,
            'top': 0,
            'bottom': this.y
        };
    }

    reactToCollision() {
        console.log('Top obstacle collided with another object');
    }


    update() {
        this.x -= this.speed * global.deltaTime;
    }

    draw() {
        let topCapY = this.y - this.capHeight;
    
        global.ctx.drawImage(this.pipeTopCap, this.x, topCapY, this.width, this.capHeight);
    
        let remainingHeight = this.y - this.capHeight - this.capHeight; 
    
        let middleY = topCapY - this.middleHeight; 
        while (remainingHeight > 0) {

            global.ctx.drawImage(this.pipeTopMiddle, this.x, middleY, this.width, this.middleHeight);
    
            middleY -= this.middleHeight;
            remainingHeight -= this.middleHeight;
        }
        
        global.ctx.drawImage(this.pipeTopEnd, this.x, 0, this.width, this.capHeight);
    }
}

export { TopObstacle };
