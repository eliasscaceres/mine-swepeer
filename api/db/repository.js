import { MongoClient, ObjectID } from 'mongodb';

const MONGODB_URI =
  'mongodb+srv://admin:admin1234@cluster0.xxs7x.mongodb.net/<testing>?retryWrites=true&w=majority';
let dbInstance = null;

const connect = async () => {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }
  const db = await MongoClient.connect(MONGODB_URI);
  dbInstance = db.db('testing');
  return dbInstance;
};

const getById = async (id) => {
  const db = await connect();
  const game = await db.collection('mines').findOne(new ObjectID(id));
  return game;
};

const save = async (obj) => {
  const db = await connect();
  const { ops: inserted } = await db.collection('mines').insertOne(obj);
  return inserted[0];
};

const getAllSimplified = async () => {
  const db = await connect();

  const ids = await db
    .collection('mines')
    .find()
    .project({ _id: 1, level: 1, size: 1, state: 1 })
    .toArray();
  return ids;
};

const remove = async (id) => {
  const db = await connect();
  const deletedGame = await db
    .collection('mines')
    .deleteOne({ _id: new ObjectID(id) });
  return deletedGame;
};

const getSimplifiedGame = async (id) => {
  const db = await connect();
  const parsedGame = await db
    .collection('mines')
    .find({ _id: new ObjectID(id) })
    .project({ _id: 1, level: 1, size: 1, status: 1 })
    .toArray();
  return parsedGame;
};

export { getById, getSimplifiedGame, save, getAllSimplified, remove };
