import React from 'react';
import { connect } from 'react-redux';
import { initGame } from '../actions';
import GameBoard from './GameBoard';

class Game extends React.Component {
    componentDidMount() {
        this.props.dispatch(initGame());
    }
    render() {
        return (
            <div>
                <GameBoard/>
            </div>
        );
    }
}

export default connect()(Game);