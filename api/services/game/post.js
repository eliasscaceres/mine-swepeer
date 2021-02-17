import { create } from '../../models/game';
import { createResponse } from '../../helpers/utils';
import maskBoard from '../../controllers/maskBoard';

/** POST start a new game
 *
 * @param {Object} event from aws which contains the request parameters
 */
const postGame = async (event) => {
  try {
    const { name, size, mines } = (event.body && JSON.parse(event.body)) || {};

    // add validations
    if (!name && (!size || !mines)) {
      return createResponse(400, 'Invalid parameters');
    }
    const game = await create(name, size, mines);

    game.board = maskBoard(game.board);

    return createResponse(200, game);
  } catch (error) {
    console.error(error);
    return createResponse(500, 'Internal server error');
  }
};

// eslint-disable-next-line import/prefer-default-export
export { postGame };
