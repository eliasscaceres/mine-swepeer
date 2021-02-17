import _ from 'lodash';
import dotProp from 'dot-prop-immutable';
import { boardEnum, adjacentPositionEnum } from '../constants/enum';
import { getById } from '../db/repository';

const checkAdjacentValues = (row, col, board, callback) => {
  Object.keys(adjacentPositionEnum).forEach((key) => {
    const position = adjacentPositionEnum[key];
    let adjacentSquareValue = '';
    const currentRowChecked = row + position[0];
    const currentColChecked = col + position[1];

    if (currentRowChecked >= 0 && currentColChecked >= 0) {
      adjacentSquareValue = _.get(board, [
        currentRowChecked,
        currentColChecked,
      ]);
    }

    callback({
      value: adjacentSquareValue,
      currentRowChecked,
      currentColChecked,
      position,
    });
  });
};

const recursivelyRevealSquares = (row, col, board) => {
  let nextBoard = board;
  let bombsAround = 0;

  checkAdjacentValues(row, col, board, ({ value }) => {
    if (value === boardEnum.UNREVEALED_MINE_POSITION) {
      bombsAround += 1;
    }
  });

  if (bombsAround === 0) {
    nextBoard = dotProp.set(
      nextBoard,
      [row, col],
      boardEnum.BLANK_REVEALED_POSITION
    );

    // if the selected square doesn't have a bomb around, check for the adjacent squares
    checkAdjacentValues(
      row,
      col,
      board,
      ({ value, currentRowChecked, currentColChecked }) => {
        const isInBoardBoundaries =
          currentRowChecked !== null &&
          currentRowChecked >= 0 &&
          currentRowChecked < board.length &&
          currentColChecked !== null &&
          currentColChecked < _.get(board, [currentRowChecked, 'length']);

        // if some adjacent square doesn't have a bomb around, reveal the square.
        if (
          isInBoardBoundaries &&
          value === boardEnum.UNREVEALED_EMPTY_POSITION
        ) {
          nextBoard = recursivelyRevealSquares(
            currentRowChecked,
            currentColChecked,
            nextBoard
          );
        }
      }
    );

    return nextBoard;
  }
  // if the square have a bomb around, show the number
  return dotProp.set(nextBoard, [row, col], bombsAround);
};
const markPosition = (row, col, board, mark) => {
  const currentValue = _.get(board, [row, col]);

  if (
    typeof currentValue === 'number' ||
    currentValue === boardEnum.BLANK_REVEALED_POSITION
  ) {
    throw new Error('Position already revealed');
  }
  if (!(mark in boardEnum)) {
    throw new Error('value is not valid');
  }

  return dotProp.set(board, [row, col], mark);
};

/**
 * Execute a new move.
 * @param {Number} row board cant rows
 * @param {Number} col board cant columns
 * @param {String} gameId game's id
 * @param {Object} [value] flag or question
 */
const generateMove = async (row, col, gameId, value) => {
  const game = await getById(gameId);
  const cell = _.get(game.board, [row, col]);
  if (typeof cell === 'number' || cell === boardEnum.BLANK_REVEALED_POSITION) {
    throw new Error('Position already revealed. Please select other value.');
  }

  if (value) {
    return markPosition(row, col, game.board, value);
  }

  if (cell === boardEnum.UNREVEALED_MINE_POSITION) {
    game.state = 'lost';
    dotProp.set(game.board, [row, col], boardEnum.BOMB_REVEALED_POSITION);
    return game;
  }
  game.board = recursivelyRevealSquares(row, col, game.board);
  return game;
};

export default generateMove;
