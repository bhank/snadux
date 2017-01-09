import React from 'react';
import { connect } from 'react-redux';
import { restartGame } from '../actions';

const ControlPanel = ({ dispatch }) => (
    <div>
        <button onClick={() => dispatch(restartGame())}>Restart</button>
    </div>
);

export default connect()(ControlPanel);