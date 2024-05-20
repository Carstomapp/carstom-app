export abstract class VehiclesApi {
  public static async getBrands(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }

  public static async getModels(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }

  public static async getYears(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }
}
