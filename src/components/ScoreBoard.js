import React from 'react';
import { connect } from 'react-redux';

const ScoreBoard = ({ moves, score, length }) => (
    <div>
        <div>
            Moves: {moves}
        </div>
        <div>
            Score: {score}
        </div>
        <div>
            Length: {length}
        </div>
    </div>
);

function mapStateToProps(state) {
    return {
        moves: state.moves,
        score: state.score,
        length: state.maxSnakeLength
    };
}
export default connect(mapStateToProps)(ScoreBoard);