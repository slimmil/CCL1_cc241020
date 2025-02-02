import { global } from '../modules/global.js'

class Honey {

    constructor(x, y, width, height) {

        this.name = 'Honey';
        this.active= 'true';
        this.collected = false;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.speed = 100;

        this.image = new Image();
        this.image.src = './images/honey.png';

        global.allGameObjects.push(this);
    };

    boxBounds = function() {
        let bounds = {
            'left': this.x,
            'right': this.x + this.width,
            'top': this.y,
            'bottom': this.y + this.height
        };
        return bounds;
    };

    reactToCollision(gameObject) {
      
        if (gameObject.name === 'Bee' && !this.collected) {
            
            this.collected = true;
            this.active = false;
            
            if (this.collected = true) {
                global.honeyCount++;
            }
        }

        if (global.honeyCount >= 10) {
            global.gameState = 'win';
        }
    }

    draw() {     
        global.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    update() {
        this.x -= 100 * global.deltaTime; 
    };
};


export { Honey }