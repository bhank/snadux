import * as actions from '../actions';
import { combineReducers } from 'redux';

function playing(state = false, action) {
    switch(action.type) {
        case actions.START_GAME:
            return true;
        case actions.GAME_OVER:
            return false;
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
        case actions.INCREASE_SNAKE_LENGTH:
            return state + 1;
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

export default combineReducers({
    playing,
    moves,
    snakeDirection,
    snakePositions,
    maxSnakeLength,
    treasurePosition
});
