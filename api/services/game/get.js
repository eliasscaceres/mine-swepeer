import { getAll } from '../../models/game';
import { createResponse } from '../../helpers/utils';
/* get game */

const handler = async () => {
  try {
    const games = await getAll();
    return createResponse(200, games);
  } catch (error) {
    console.error(error);
    return createResponse(500, 'Internal server error');
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
