import React from 'react';
import { connect } from 'react-redux';
import { initGame } from '../actions';
import Banner from './Banner';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import ControlPanel from './ControlPanel';

class Game extends React.Component {
    componentDidMount() {
        this.props.dispatch(initGame());
    }
    render() {
        return (
            <div>
                <Banner/>
                <GameBoard/>
                <ScoreBoard/>
                <ControlPanel/>
            </div>
        );
    }
}

export default connect()(Game);