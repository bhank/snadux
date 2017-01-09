import * as actions from '../actions';
import * as constants from '../constants';
import { combineReducers } from 'redux';

function status(state = constants.STATUS_GAME_OVER, action) {
    switch(action.type) {
        case actions.START_GAME:
        case actions.UNPAUSE_GAME:
            return constants.STATUS_PLAYING;
        case actions.PAUSE_GAME:
            return constants.STATUS_PAUSED;
        case actions.GAME_OVER:
            return constants.STATUS_GAME_OVER;
        default:
            return state;
    }
}

function moves(state = 0, action) {
    switch(action.type) {
        case actions.START_GAME:
            return 0;
        case actions.MOVE_TO_POSITION:
            return state + 1;
        default:
            return state;
    }
}

function snakeDirection(state = '', action) {
    switch(action.type) {
        case actions.SET_DIRECTION:
            return action.direction;
        default:
            return state;
    }
}

function snakePositions(state = [], action) {
    switch(action.type) {
        case actions.START_GAME:
            return [{x: 0, y: 0}];
        case actions.MOVE_TO_POSITION:
            const positions = state.slice(action.cutOffTail ? 1 : 0);
            positions.push(action.position);
            return positions;
        default:
            return state;
    }
}

function maxSnakeLength(state = 5, action) {
    switch(action.type) {
        case actions.START_GAME:
            return 5;
        case actions.INCREASE_SNAKE_LENGTH:
            return state + action.increment;
        default:
            return state;
    }
}

function treasurePosition(state = null, action) {
    switch(action.type) {
        case actions.SET_TREASURE_POSITION:
            return action.position;
        default:
            return state;
    }
}

function score(state = 0, action) {
    switch(action.type) {
        case actions.START_GAME:
            return 0;
        case actions.INCREMENT_SCORE:
            return state + 1;
        default:
            return state;
    }
}

export default combineReducers({
    status,
    moves,
    snakeDirection,
    snakePositions,
    maxSnakeLength,
    treasurePosition,
    score
});
