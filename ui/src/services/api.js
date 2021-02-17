import axios from 'axios';

const requestHandler = (req) => {
  return req;
};

const responseHandler = (res) => {
  return res ? res.data : res;
};

const responseErrorHandler = (err) => {
  return Promise.reject(err);
};

const API = axios.create({
  baseURL: build.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(requestHandler);
API.interceptors.response.use(responseHandler, responseErrorHandler);

export const getGames = async () =>
  await API.get(`/dev/game`);

export const getGame = async (id) =>
  await API.get(`/dev/game/${id}`);

export const createGame = async (values) =>
  await API.post(`/dev/game`, values);

export const createMove = async (values) =>
  await API.post(`/dev/moves`, values);

