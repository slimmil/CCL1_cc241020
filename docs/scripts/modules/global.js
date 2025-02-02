const global = {};

global.canvas = document.querySelector('#canvas');
global.ctx = global.canvas.getContext('2d');

global.deltaTime = 0;
global.prevRunTime = 0;

global.gameRunning = false;
global.gameState = 'start';

global.startScreen = document.querySelector('#start-screen');
global.gameOverScreen = document.querySelector('#game-over-screen');
global.winScreen = document.querySelector('#win-screen');
global.instructions = document.querySelector('#instructions-screen');
global.help = document.querySelector('#help');

global.startButton = document.querySelector('#start-btn');
global.menuButton = document.querySelector('#back-to-menu');
global.menuButton2 = document.querySelector('#home');
global.menuButton3 = document.querySelector('#back-to-start');
global.helpButton = document.querySelector('#help-btn')

global.gravity = 9.8;
global.pixelToMeter = 30;
global.maxFallVelocity = 53;

global.allGameObjects = [];
global.playerObject = {};
global.obstacles = [];
global.background = [];
global.meter = [];

global.obstacleCount = 0;
global.honeyCount = 0;


global.canvasBounds = function() {

    let bounds = {

        'left': 0,
        'right': this.canvas.width,
        'top': 0,
        'bottom': this.canvas.height
    };

    return bounds;
};


global.detectCollision = function (gameObject1, gameObject2) {

    let box1 = gameObject1.boxBounds();
    let box2 = gameObject2.boxBounds();

    if (gameObject1 != gameObject2) {

        if (box1.top <= box2.bottom && box1.left <= box2.right && 
            box1.bottom >= box2.top && box1.right >= box2.left) {
    
            return true;
        };
    };

    return false;
};

global.checkCollision = function(givenObject) {

    for (let i = 0; i < global.allGameObjects.length; i ++) {
        let otherObject = global.allGameObjects[i];

        if (otherObject.active === true) {

            let collision = this.detectCollision(givenObject, otherObject);

            if (collision) {

                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
                console.log('collision detected');
            };
        };
    };
};

export { global }

