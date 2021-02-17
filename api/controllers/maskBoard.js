import dotProp from 'dot-prop-immutable';
import { boardEnum } from '../constants/enum';
/**
 * Mask a board to be sent to the client.
 * @param {Array} board board to be masked
 */
const maskBoard = (board = []) => {
  return board.reduce((acc, row, idx) => {
    const maskedRow = row.map((value) => {
      if (
        value === boardEnum.UNREVEALED_EMPTY_POSITION ||
        value === boardEnum.UNREVEALED_MINE_POSITION
      ) {
        return boardEnum.MASKED_POSITION;
      }
      return value;
    });

    return dotProp.set(acc, [idx], maskedRow);
  }, board);
};
export default maskBoard;
