import axios from 'axios';
import { Logger } from '../../utils/Logger';
import { QueryString } from '../../utils/QueryString';

const token = QueryString.getString('t');

Logger.info(`API initialization: ${process.env.API_URL}`);

export const client = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
