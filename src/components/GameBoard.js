import React from 'react';
import { connect } from 'react-redux';
import * as constants from '../constants';

const GameBoard = ({ grid }) => {
    let tableRows = grid.map((gridRow, rowIndex) => (
        <tr key={`row${rowIndex}`}>
            {gridRow.map((gridCol, colIndex) => (
                <td key={`col${colIndex}`} className={gridCol ? 'snake' : 'empty'}><div></div></td>)
            )}
        </tr>
    ));
    return (
        <table width={constants.BOARD_WIDTH} height={constants.BOARD_WIDTH}>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
}

function snakePositionsToGrid(snakePositions) {
    let grid = [];
    for(var y = 0; y < constants.BOARD_HEIGHT; y++) {
        grid.push(new Array(constants.BOARD_WIDTH).fill(false));
    }
    snakePositions.forEach(p => grid[p.y][p.x] = true);
    return grid;
}

function mapStateToProps(state) {
    return {
        grid: snakePositionsToGrid(state.snakePositions)
    };
}

export default connect(mapStateToProps)(GameBoard);