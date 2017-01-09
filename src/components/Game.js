import React from 'react';
import { connect } from 'react-redux';
import { initGame } from '../actions';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

class Game extends React.Component {
    componentDidMount() {
        this.props.dispatch(initGame());
    }
    render() {
        return (
            <div>
                <div>
                    <GameBoard/>
                </div>
                <div>
                    <ScoreBoard/>
                </div>
            </div>
        );
    }
}

export default connect()(Game);