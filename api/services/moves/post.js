import generateMove from '../../controllers/moves';
import { createResponse } from '../../helpers/utils';
import maskBoard from '../../controllers/maskBoard';
/* POST start a new game */

const handler = async (event) => {
  try {
    const { gameId, row, col, value } =
      (event.body && JSON.parse(event.body)) || {};
    // add validations
    if (!gameId || row < 0 || col < 0) {
      return createResponse(400, 'Invalid parameters');
    }
    const game = await generateMove(row, col, gameId, value);
    game.board = maskBoard(game.board);
    return createResponse(200, game);
  } catch (error) {
    console.error(error);
    return createResponse(500, 'Internal server error');
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
