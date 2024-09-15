export abstract class ErrorHandling {
  public static extractErrorMessage(error: unknown): string {
    let errorMessage = '';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    return errorMessage;
  }
}
