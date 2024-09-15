import { queryParams } from '../constants';
import { QueryString } from './QueryString';

export abstract class Navigation {
  public static getRouteWithToken(to: string): string {
    const token = QueryString.getString(queryParams.TOKEN);

    const parameters = QueryString.create({
      [queryParams.TOKEN]: token,
    });

    return `${to}?${parameters}`;
  }
}
