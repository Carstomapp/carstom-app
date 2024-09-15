import { type GatsbyBrowser } from 'gatsby';
import { errors, queryParams } from './src/constants';
import './src/styles/index.css';
import { ErrorNavigationState } from './src/types';
import { ErrorHandling, Navigation, QueryString } from './src/utils';

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] = () => {
  try {
    QueryString.validateString(queryParams.TOKEN, errors.APP_TOKEN_PARAMETER);
  } catch (error) {
    Navigation.navigateWithToken('/error', {
      state: {
        errorMessage: ErrorHandling.extractErrorMessage(error),
        canGoHome: false,
      } as ErrorNavigationState,
    });
  }
};
