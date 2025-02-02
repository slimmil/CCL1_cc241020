import { global } from './global.js'
import { Bee } from '../game-objects/bee.js'
import { Background } from '../game-objects/background.js'
import { Honey } from '../game-objects/honey.js'
import { TopObstacle } from '../game-objects/topObstacle.js';
import { BottomObstacle } from '../game-objects/bottomObstacle.js';
import { HoneyMeter } from '../game-objects/meter.js';

function showScreen(state) {

    state = global.gameState;

    global.startScreen.style.display = 'none';
    global.gameOverScreen.style.display = 'none';
    global.winScreen.style.display = 'none';
    global.instructions.style.display = 'none';
    global.help.style.display = 'none';

    switch (state) {
        case 'start':
            global.startScreen.style.display = 'block';
            break;
        case 'gameOver':
            global.gameOverScreen.style.display = 'block';
            break;
        case 'win':
            global.winScreen.style.display = 'block';
            break;
        case 'waiting':
            global.instructions.style.display = 'block';
            break;
        case 'help':
            global.help.style.display = 'block';
            break;
    };
};

function gameLoop(totalRunTime) {

    global.deltaTime = (totalRunTime - global.prevRunTime) / 1000;
    global.prevRunTime = totalRunTime;

    showScreen();
    
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
 
    if (global.obstacles.length === 0 || global.obstacles[global.obstacles.length - 1].x < global.canvas.width - 200) {

        let pipeHeight = Math.floor(Math.random() * (global.canvas.height / 2)) + 50;
        let randomGap = Math.floor(Math.random() * 60) + 80;

        new TopObstacle(global.canvas.width, pipeHeight, 50, randomGap, global.obstacleCount);
        new BottomObstacle(global.canvas.width, pipeHeight, 50, randomGap);

        global.obstacleCount++; 

        if (global.obstacleCount % 5 === 0 || global.obstacleCount % 7 === 0) {

            let honeyY = pipeHeight + (Math.random() * 100 - 30);
            new Honey(global.canvas.width + 115, honeyY, 20, 20);
        };
    };

    if (global.gameState === 'waiting') {

        for (let i = 0; i < global.background.length; i++) {
            global.background[i].draw();
        };
        
        for (let i = 0; i < global.allGameObjects.length; i++) {

            if (global.allGameObjects[i].active) {

                global.allGameObjects[i].draw();
            }
        };

        for (let i = 0; i < global.meter.length; i++) {
            global.meter[i].draw();
        };
    };

    if (global.gameState === 'running') {

        for (let i = 0; i < global.background.length; i++) {
            global.background[i].draw();
            global.background[i].update();
        };

        for (let i = 0; i < global.allGameObjects.length; i++) {
            
            if (global.allGameObjects[i].active) {

                global.allGameObjects[i].draw();
                global.allGameObjects[i].update();
            }
            
            global.checkCollision(global.allGameObjects[i]);
        };

        for (let i = 0; i < global.meter.length; i++) {
            global.meter[i].draw();
        };
    };
    
    
    requestAnimationFrame(gameLoop);
};

export function setupGame() {

    global.gameState = 'waiting';

    global.playerObject = new Bee(200, 150, 20, 20);
    new Background();
    new HoneyMeter(10, 10, 300, 20);
};

export function restartGame() {

    global.allGameObjects = [];
    global.obstacles = [];
    
    global.obstacleCount = 0;
    global.honeyCount = 0;
    
    setupGame()
}

gameLoop();



