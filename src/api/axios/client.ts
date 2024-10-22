import axios from 'axios';
import { queryParams } from '../../constants';
import { Logger, QueryString } from '../../utils';

const token = QueryString.getString(queryParams.TOKEN);

Logger.info(`API initialization: ${process.env.GATSBY_API_URL}`);

export const client = axios.create({
  baseURL: process.env.GATSBY_API_URL,
  timeout: 1000 * 60,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
