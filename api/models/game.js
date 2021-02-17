import { getAllSimplified, save, remove, getById } from '../db/repository';
import createGame from '../controllers/factory';

/**
 * get all games
 */
const getAll = async () => {
  const games = await getAllSimplified();
  return games;
};
/**
 * Get game by ID
 * @param {String} id
 */
const get = (id) => {
  return getById(id);
};

/**
 * creates a new Game
 * @param {String} level Level of the game
 * @param {Object} size  Size of the board x,y
 * @param {Number} mines Cant of mines
 */
const create = async (level, size, mines) => {
  const game = createGame(level, size, mines);
  const saved = await save(game);
  return saved;
};

/**
 * Delete an specific game by id.
 * @param {String} id
 */
const del = (id) => {
  const game = remove(id);
  return game;
};

export { getAll, get, create, del };
