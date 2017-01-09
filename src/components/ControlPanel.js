import React from 'react';
import { connect } from 'react-redux';
import { restartGame, setPauseState } from '../actions';

const ControlPanel = ({ dispatch }) => (
    <div>
        <button onClick={() => dispatch(setPauseState())}>Pause/Unpause</button>
        <button onClick={() => dispatch(restartGame())}>Restart</button>
    </div>
);

export default connect()(ControlPanel);