import React from 'react';
import { connect } from 'react-redux';
import * as constants from '../constants';

const GameBoard = ({ grid }) => {
    let tableRows = grid.map((gridRow, rowIndex) => (
        <tr key={`row${rowIndex}`}>
            {gridRow.map((gridCol, colIndex) => (
                <td key={`col${colIndex}`} className={gridCol}><div></div></td>)
            )}
        </tr>
    ));
    return (
        <div>
            <table width={constants.BOARD_WIDTH} height={constants.BOARD_WIDTH}>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    );
}

function getGrid(snakePositions, treasurePosition) {
    let grid = [];
    for(var y = 0; y < constants.BOARD_HEIGHT; y++) {
        grid.push(new Array(constants.BOARD_WIDTH).fill(null));
    }
    snakePositions.forEach(p => grid[p.y][p.x] = 'snake');
    if(treasurePosition) {
        grid[treasurePosition.y][treasurePosition.x] = 'treasure';
    }
    return grid;
}

function mapStateToProps(state) {
    return {
        grid: getGrid(state.snakePositions, state.treasurePosition)
    };
}

export default connect(mapStateToProps)(GameBoard);