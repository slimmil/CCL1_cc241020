import { global } from './global.js'
import { setupGame } from './game.js'
import { restartGame } from './game.js';


global.startButton.addEventListener('click', function() {
    setupGame();
    restartGame();
});

global.menuButton.addEventListener('click', function() {
    global.gameState = 'start';
});

global.menuButton2.addEventListener('click', function() {
    global.gameState = 'start';
});

global.menuButton3.addEventListener('click', function() {
    global.gameState = 'start';
});

global.helpButton.addEventListener('click', function() {
    global.gameState = 'help';
});

function jump(event){
    
    if (event.key == ' ' && (global.gameState === 'waiting' || global.gameState === 'running')) {
        global.gameState = 'running';
        global.playerObject.jump();
    };
};

document.addEventListener('keypress', jump);

function restart(event) {

    if (event.key == 'Enter' && (global.gameState === 'win' || global.gameState === 'gameOver')) {
        
        restartGame();
        console.log('restarting game');
    };
};

document.addEventListener('keypress', restart);

