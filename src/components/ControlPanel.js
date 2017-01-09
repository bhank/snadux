import React from 'react';
import { connect } from 'react-redux';
import { restartGame, setPauseState } from '../actions';
import * as constants from '../constants';

const ControlPanel = ({ dispatch, disablePauseButton, paused }) => (
    <div>
        <button disabled={disablePauseButton} onClick={() => dispatch(setPauseState())}>{paused ? 'Resume' : 'Pause'}</button>
        <button onClick={() => dispatch(restartGame())}>Restart</button>
    </div>
);

function mapStateToProps(state) {
    return {
        disablePauseButton: state.status !== constants.STATUS_PAUSED && state.status !== constants.STATUS_PLAYING,
        paused: state.status === constants.STATUS_PAUSED
    }
}
export default connect(mapStateToProps)(ControlPanel);