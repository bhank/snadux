import * as constants from '../constants';

export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_SNAKE_ALIVE = 'SET_SNAKE_ALIVE';
export const MOVE_TO_POSITION = 'MOVE_TO_POSITION';
export const INIT_GAME = 'INIT_GAME';
export const START_GAME = 'START_GAME';
export const GAME_OVER = 'GAME_OVER';

export const DIRECTION_N = 'DIRECTION_N';
export const DIRECTION_S = 'DIRECTION_S';
export const DIRECTION_E = 'DIRECTION_E';
export const DIRECTION_W = 'DIRECTION_W';

export const startGame = () => ({
    type: START_GAME
});

export const gameOver = () => ({
    type: GAME_OVER
});

export const setDirection = (direction) => ({
    type: SET_DIRECTION,
    direction
});

export const initGame = () => (
    function(dispatch) {
        window.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 37:
                    e.preventDefault();
                    dispatch(setDirection(DIRECTION_W));
                    dispatch(advance());
                    break;
                case 38:
                    e.preventDefault();
                    dispatch(setDirection(DIRECTION_N));
                    dispatch(advance());
                    break;
                case 39:
                    e.preventDefault();
                    dispatch(setDirection(DIRECTION_E));
                    dispatch(advance());
                    break;
                case 40:
                    e.preventDefault();
                    dispatch(setDirection(DIRECTION_S));
                    dispatch(advance());
                    break;
                default:
            }
        });
        dispatch(startGame());
    }
);

export const moveToPosition = (position, cutOffTail) => ({
    type: MOVE_TO_POSITION,
    position,
    cutOffTail
});

function hitSomething(snakePositions, newHeadPosition) {
    console.log('hitSomething?', arguments);
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
        const { maxSnakeLength, snakePositions, snakeDirection } = getState();
        const newHeadPosition = getNewHeadPosition(snakePositions, snakeDirection);
        if(hitSomething(snakePositions, newHeadPosition)) {
            console.log('GAME OVER!');
            dispatch(gameOver());
        } else {
            dispatch(moveToPosition(newHeadPosition, snakePositions.length >= maxSnakeLength));
        }
    }
);

export const move = (direction) => (
    function(dispatch) {
        dispatch(setDirection(direction));
        dispatch(advance);
    }
);
