import { global } from '../modules/global.js'

class Bee {

    constructor(x, y, width, height) {

        this.name = 'Bee';
        this.active = true;

        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;
        this.width = width;
        this.height = height;

        this.yVelocity = 0;
        this.jumpForce = 7;

        global.allGameObjects.push(this);
        this.loadSprites();         /// why is it here?
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

    storePrevPosition = function() {
        this.prevX = this.x;
        this.prevY = this.y;
    };

    animationData = {

        'sprites': [],
        'timePerSprite': 0.06,
        'curTime': 0,
        'firstSprite': 0,
        'lastSprite': 2,
        'curSprite': 0
    };

    loadSprites = function() {

        let image1 = new Image();
        let image2 = new Image();
        let image3 = new Image();

        image1.src = './images/sprites/Bee-01.png';
        image2.src = './images/sprites/Bee-02.png';
        image3.src = './images/sprites/Bee-03.png';

        this.animationData.sprites.push(image1, image2, image3);
    };

    nextSprite = function() {

        this.animationData.curTime += global.deltaTime;
    
        while (this.animationData.curTime >= this.animationData.timePerSprite) {
            this.animationData.curTime -= this.animationData.timePerSprite;
            this.animationData.curSprite++;
    
            if (this.animationData.curSprite > this.animationData.lastSprite) {
                this.animationData.curSprite = this.animationData.firstSprite;
            }
        }
    
        return this.animationData.sprites[this.animationData.curSprite];
    };

    applyGravity = function() {

        this.yVelocity += global.gravity * global.deltaTime * global.pixelToMeter;

        if (this.yVelocity > global.maxVelocity * global.pixelToMeter) {
            this.yVelocity = global.maxVelocity * global.pixelToMeter;
        };
    };

    reactToCollision = function(gameObject) {
        console.log('Collision detected with: ', gameObject.name);
        
        if (gameObject.name == 'TopObstacle' || gameObject.name == 'BottomObstacle') {
            global.gameState = 'gameOver'; 
            global.gameRunning = false;     
            this.yVelocity = 0;              
        };

        if (global.honeyCount >= 10) {
            global.gameState = 'win';
        };
    };

    checkCollisionCanvas = function() {
        if (this.y + this.height >= global.canvas.height || this.y <= 0) {
            global.gameState = 'gameOver';
        }
    };

    jump = function() {

        this.yVelocity = -this.jumpForce * global.pixelToMeter;
    };

    draw() {

        let sprite = this.nextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        
    };

    update() {
        this.applyGravity();
        this.y += this.yVelocity * global.deltaTime;

        this.checkCollisionCanvas();
    }; 

};

export { Bee }