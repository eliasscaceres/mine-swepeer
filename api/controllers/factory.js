import levels from '../constants/level';
import { boardEnum } from '../constants/enum';

/**
 * Generate a board with parameters passed
 * @param {Number} rows matrix's rows
 * @param {Number} cols matrix's columns
 * @param {Number} mines matrix's mines
 */
const generateBoard = (rows, cols, mines) => {
  const availablePositions = rows * cols;
  if (availablePositions <= mines) {
    throw new Error('There is not available positions to place all mines.');
  }

  const board = new Array(rows)
    .fill(boardEnum.UNREVEALED_EMPTY_POSITION)
    .map(() => new Array(cols).fill(boardEnum.UNREVEALED_EMPTY_POSITION));

  for (let i = 0; i < mines; i += 1) {
    const rowCord = Math.floor(Math.random() * rows);
    const colCord = Math.floor(Math.random() * cols);

    if (board[rowCord][colCord] !== boardEnum.UNREVEALED_MINE_POSITION) {
      board[rowCord][colCord] = boardEnum.UNREVEALED_MINE_POSITION;
    }
  }

  return board;
};
/**
 * Creates a new game with its respective board and mines.
 * @param {String} name
 * @param {Object} boardSize
 * @param {Number} minesCant
 */
const create = (name, boardSize, minesCant) => {
  const minesCount = levels[name].minesCount || minesCant;
  const size = levels[name].size || boardSize;
  const gameBoard = generateBoard(size.y, size.x, minesCount);
  return {
    level: name,
    size,
    board: gameBoard,
    state: 'in-progress',
  };
};

export default create;
