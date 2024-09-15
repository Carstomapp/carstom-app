import qs from 'qs';

export abstract class QueryString {
  public static create(values: object): string {
    const queryString = qs.stringify(values);
    return queryString;
  }

  public static validateString(key: string, error: string, source = global.location?.search): void {
    const value = QueryString.getString(key, source);

    if (!value) {
      throw new Error(error);
    }
  }

  public static getString(key: string, source = global.location?.search): string | undefined {
    const value = qs.parse(QueryString.trimSource(source))[key];
    return value ? String(value) : undefined;
  }

  private static trimSource(source = ''): string {
    return source.startsWith('?') ? source.slice(1) : source;
  }
}
