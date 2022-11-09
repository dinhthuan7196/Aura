import axios, { AxiosError } from 'axios';

const url =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_STAGING_URL
    : process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const catchError = (error: unknown) => error as AxiosError;

export { api, catchError };
