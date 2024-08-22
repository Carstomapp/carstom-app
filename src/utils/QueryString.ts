import qs from 'qs';

export abstract class QueryString {
  public static getString(key: string, source = global.location?.search): string | undefined {
    const value = qs.parse(QueryString.trimSource(source))[key];
    return value ? String(value) : undefined;
  }

  private static trimSource(source: string): string {
    return source.startsWith('?') ? source.slice(1) : source;
  }
}
