import React from 'react';
import { connect } from 'react-redux';
import { restartGame, setPauseState } from '../actions';
import * as constants from '../constants';

const ControlPanel = ({ dispatch, disablePauseButton, paused, gameOver }) => (
    <div>
        <button disabled={disablePauseButton} onClick={() => dispatch(setPauseState())}>{paused ? 'Resume' : 'Pause'}</button>
        <button onClick={() => dispatch(restartGame())}>Restart</button>
        <span style={{display: gameOver ? 'inline' : 'none' }}> Game Over! Click <a href="#" onClick={(e) => { e.preventDefault(); dispatch(restartGame()); } }>Restart</a> to try again.</span>
    </div>
);

function mapStateToProps(state) {
    return {
        disablePauseButton: state.status !== constants.STATUS_PAUSED && state.status !== constants.STATUS_PLAYING,
        paused: state.status === constants.STATUS_PAUSED,
        gameOver: state.status === constants.STATUS_GAME_OVER
    }
}

export default connect(mapStateToProps)(ControlPanel);