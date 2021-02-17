import dotProp from 'dot-prop-immutable';
import { boardEnum } from '../constants/enum';

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
