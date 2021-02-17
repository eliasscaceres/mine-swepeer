/* eslint-disable no-undef */
const boardEnum = Object.freeze({
  UNREVEALED_EMPTY_POSITION: 'E',
  UNREVEALED_MINE_POSITION: 'M',
  BLANK_REVEALED_POSITION: 'B',
  BOMB_REVEALED_POSITION: 'X',
  MASKED_POSITION: '[]',
  BOMB_FLAGGED: 'F',
  QUESTION_MARK: '?',
  RESET_POSITION: 'R',
});
const adjacentPositionEnum = Object.freeze({
  UP: [-1, 0],
  UP_RIGHT: [-1, 1],
  RIGHT: [0, 1],
  DOWN_RIGHT: [1, 1],
  DOWN: [1, 0],
  DOWN_LEFT: [1, -1],
  LEFT: [0, -1],
  UP_LEFT: [-1, -1],
});

export { boardEnum, adjacentPositionEnum };
