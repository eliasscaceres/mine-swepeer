import { getAllSimplified, save, remove, getById } from '../db/repository';
import createGame from '../controllers/factory';

const getAll = async () => {
  const games = await getAllSimplified();
  return games;
};

const get = (id) => {
  return getById(id);
};

const create = async (level, size, mines) => {
  const game = createGame(level, size, mines);
  const saved = await save(game);
  return saved;
};

const del = (id) => {
  const game = remove(id);
  return game;
};

export { getAll, get, create, del };
