import * as constants from '../constants';

export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_SNAKE_ALIVE = 'SET_SNAKE_ALIVE';
export const MOVE_TO_POSITION = 'MOVE_TO_POSITION';
export const INCREASE_SNAKE_LENGTH = 'INCREASE_SNAKE_LENGTH';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const SET_TREASURE_POSITION = 'SET_TREASURE_POSITION';
export const INIT_GAME = 'INIT_GAME';
export const START_GAME = 'START_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const UNPAUSE_GAME = 'UNPAUSE_GAME';
export const GAME_OVER = 'GAME_OVER';

export const DIRECTION_N = 'DIRECTION_N';
export const DIRECTION_S = 'DIRECTION_S';
export const DIRECTION_E = 'DIRECTION_E';
export const DIRECTION_W = 'DIRECTION_W';

export const startGame = () => ({
    type: START_GAME
});

export const pauseGame = () => ({
    type: PAUSE_GAME
});

export const unpauseGame = () => ({
    type: UNPAUSE_GAME
});

export const gameOver = () => ({
    type: GAME_OVER
});

export const setDirection = (direction) => ({
    type: SET_DIRECTION,
    direction
});

export const moveToPosition = (position, cutOffTail) => ({
    type: MOVE_TO_POSITION,
    position,
    cutOffTail
});

export const increaseLength = (increment = 1) => ({
    type: INCREASE_SNAKE_LENGTH,
    increment
});

export const setTreasurePosition = (position) => ({
    type: SET_TREASURE_POSITION,
    position
});

export const incrementScore = () => ({
    type: INCREMENT_SCORE
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const placeTreasure = (dispatch, getState) => {
    const { snakePositions } = getState();
    let treasurePosition;
    do {
        treasurePosition = {
            x: getRandomInt(0, constants.BOARD_WIDTH),
            y: getRandomInt(0, constants.BOARD_HEIGHT)
        };
        console.log('Place treasure here?', treasurePosition);
    } while (snakePositions.findIndex(p => p.x === treasurePosition.x && p.y === treasurePosition.y) > -1);

    dispatch(setTreasurePosition(treasurePosition));
};

const gotTreasure = (dispatch, getState) => {
    dispatch(incrementScore());
    placeTreasure(dispatch, getState);
    dispatch(increaseLength(5));
};

function hitSomething(snakePositions, newHeadPosition) {
    const hitTheWall = newHeadPosition.x < 0 || newHeadPosition.x >= constants.BOARD_WIDTH || newHeadPosition.y < 0 || newHeadPosition.y >= constants.BOARD_HEIGHT;
    const hitSelf = snakePositions.findIndex(p => p.x === newHeadPosition.x && p.y === newHeadPosition.y) > -1;
    return hitTheWall || hitSelf;
}

function getNewHeadPosition(snakePositions, direction) {
    const currentHeadPosition = snakePositions[snakePositions.length - 1];
    let newHeadPosition;
    switch(direction) {
        case DIRECTION_N:
            newHeadPosition = {x: currentHeadPosition.x, y: currentHeadPosition.y - 1};
            break;
        case DIRECTION_S:
            newHeadPosition = {x: currentHeadPosition.x, y: currentHeadPosition.y + 1};
            break;
        case DIRECTION_E:
            newHeadPosition = {x: currentHeadPosition.x + 1, y: currentHeadPosition.y};
            break;
        case DIRECTION_W:
            newHeadPosition = {x: currentHeadPosition.x - 1, y: currentHeadPosition.y};
            break;
        default:
            throw new Error(`Unexpected move direction: ${direction}`);
    }
    return newHeadPosition;
}

export const advance = () => (
    function(dispatch, getState) { // change to lambda?
        const { maxSnakeLength, snakePositions, snakeDirection, treasurePosition } = getState();
        const newHeadPosition = getNewHeadPosition(snakePositions, snakeDirection);
        if(hitSomething(snakePositions, newHeadPosition)) {
            console.log('GAME OVER!');
            dispatch(gameOver());
        } else {
            dispatch(moveToPosition(newHeadPosition, snakePositions.length >= maxSnakeLength));
            if(newHeadPosition.x === treasurePosition.x && newHeadPosition.y === treasurePosition.y) {
                gotTreasure(dispatch, getState);
            }
        }
    }
);

let animationFrame;
const nextFrame = (dispatch, getState, startTime) => {
    const currentTime = Date.now();
    const { status } = getState();
    if(status !== constants.STATUS_PLAYING) {
        return;
    }

    if(startTime === undefined || currentTime - startTime >= 150) {
        if(animationFrame && startTime === undefined) {
            cancelAnimationFrame(animationFrame);
        }
        dispatch(advance());
        startTime = currentTime;
    }
    animationFrame = requestAnimationFrame(nextFrame.bind(this, dispatch, getState, startTime));
    console.log('frame is ' + animationFrame)
};

export const restartGame = () => (dispatch, getState) => {
    if(animationFrame) {
        window.cancelAnimationFrame(animationFrame);
    }
    dispatch(startGame());
    placeTreasure(dispatch, getState);
};

export const setPauseState = (newPauseState) => (dispatch, getState) => {
    const { status } = getState();
    if((newPauseState === undefined || newPauseState === true) && status === constants.STATUS_PLAYING) {
        dispatch(pauseGame());
    } else if((newPauseState === undefined || newPauseState === false) && status === constants.STATUS_PAUSED) {
        dispatch(unpauseGame());
        nextFrame(dispatch, getState);
    }
};

export const move = (direction) => (
    function(dispatch, getState) {
        const { status } = getState();
        if(status === constants.STATUS_PLAYING) {
            dispatch(setDirection(direction));
            nextFrame(dispatch, getState);
        }
    }
)

export const initGame = () => (
    function(dispatch, getState) {
        window.addEventListener('keydown', (e) => {
            let direction;
            switch(e.keyCode) {
                case 37:
                    direction = DIRECTION_W;
                    break;
                case 38:
                    direction = DIRECTION_N;
                    break;
                case 39:
                    direction = DIRECTION_E;
                    break;
                case 40:
                    direction = DIRECTION_S;
                    break;
                default:
            }
            if(direction) {
                e.preventDefault();
                dispatch(move(direction));
            }
        });
        placeTreasure(dispatch, getState);
        dispatch(startGame());
    }
);
