export abstract class Logger {
  public static info(message: string): void {
    console.info(`%cINFO: %c${message}`, 'color: blue; font-weight: bold', 'color: blue;');
  }
}
