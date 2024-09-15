import { queryParams } from './queryParams';

export const errors = {
  APP_TOKEN_PARAMETER: `Cannot find auth token in query string. Auth token should be provided as parameter "${queryParams.TOKEN}"`,
  CAMERA_INITIALIZATION: 'Cannot initialize camera. Camera API not supported by this browser',
  CANVAS_2D_INITIALIZATION: 'Cannot initialize 2D context for video frame canvas',
};
