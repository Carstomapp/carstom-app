import { VehicleBrand, VehicleModel, VehicleYear } from './types';

export abstract class VehiclesApi {
  public static async getBrands(): Promise<VehicleBrand[]> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve([
            { id: 'AUDI', title: 'AUDI' },
            { id: 'BMW', title: 'BMW' },
            { id: 'MERCEDES-BENZ', title: 'MERCEDES-BENZ' },
            { id: 'TOYOTA', title: 'TOYOTA' },
            { id: 'RENAULT', title: 'RENAULT' },
            { id: 'OPEL', title: 'OPEL' },
            { id: 'JEEP', title: 'JEEP' },
            { id: 'TESLA', title: 'TESLA' },
            { id: 'VOLVO', title: 'VOLVO' },
            { id: 'LEXUS', title: 'LEXUS' },
          ]),
        1000,
      );
    });
  }

  public static async getModels(brandId: string): Promise<VehicleModel[]> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve(
            brandId === 'BMW'
              ? [
                  { id: '3 Series', title: '3 Series' },
                  { id: '5 Series', title: '5 Series' },
                  { id: '7 Series', title: '7 Series' },
                ]
              : [{ id: 'Test', title: 'Test' }],
          ),
        1000,
      );
    });
  }

  public static async getYears(modelId: string): Promise<VehicleYear[]> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve(
            modelId === 'Test'
              ? [
                  { id: '2004', title: '2004' },
                  { id: '2005', title: '2005' },
                  { id: '2008', title: '2008' },
                  { id: '2010', title: '2010' },
                  { id: '2012', title: '2012' },
                  { id: '2014', title: '2014' },
                  { id: '2016', title: '2016' },
                ]
              : [
                  { id: '2000', title: '2000' },
                  { id: '2015', title: '2015' },
                ],
          ),
        1000,
      );
    });
  }
}
