export abstract class Device {
  public static async requestDevicePermissions(deviceEvent: object): Promise<boolean> {
    if (!deviceEvent) {
      return false;
    }

    if ('requestPermission' in deviceEvent && typeof deviceEvent.requestPermission === 'function') {
      try {
        console.log('1111111111111111111111111111111111111');
        const response = await deviceEvent.requestPermission();
        console.log('2222222222222222222222222222222222222', response);
        return response === 'granted';
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return true;
    }
  }
}
