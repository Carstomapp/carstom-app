import { storageKeys } from '../constants';

export abstract class Logger {
  public static text(message: unknown): void {
    console.log(message);
    Logger.duplicate(message);
  }

  public static info(message: string): void {
    console.info(`%cINFO: %c${message}`, 'color: blue; font-weight: bold', 'color: blue;');
    Logger.duplicate(message);
  }

  public static setDuplicateTargetId(targetId: string | undefined): void {
    if (targetId) {
      global.sessionStorage?.setItem(storageKeys.LOGGER_DUPLICATE_TARGET_ID, targetId);
    } else {
      global.sessionStorage?.removeItem(storageKeys.LOGGER_DUPLICATE_TARGET_ID);
    }
  }

  private static duplicate(message: unknown): void {
    const targetId = global.sessionStorage?.getItem(storageKeys.LOGGER_DUPLICATE_TARGET_ID);

    if (!targetId) {
      return;
    }

    const target = global.document.getElementById(targetId);

    if (!target) {
      return;
    }

    target.innerHTML = String(message);
  }
}
