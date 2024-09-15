import { NavigateOptions } from '@reach/router';
import { navigate } from 'gatsby';
import { queryParams } from '../constants';
import { QueryString } from './QueryString';

export abstract class Navigation {
  public static async navigateWithToken<T extends object>(to: string, options?: NavigateOptions<T>): Promise<void> {
    const token = QueryString.getString(queryParams.TOKEN);

    await navigate(
      `${to}?${QueryString.create({
        [queryParams.TOKEN]: token,
      })}`,
      options,
    );
  }
}
