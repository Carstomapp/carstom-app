import axios from 'axios';
import { QueryString } from '../../utils/QueryString';

const token = QueryString.getString('t');

export const client = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
