export abstract class Device {
  public static async requestDevicePermissions(deviceEvent: object): Promise<boolean> {
    if (!deviceEvent) {
      return false;
    }

    if ('requestPermission' in deviceEvent && typeof deviceEvent.requestPermission === 'function') {
      try {
        const response = await deviceEvent.requestPermission();
        return response === 'granted';
      } catch (error) {
        return false;
      }
    } else {
      return true;
    }
  }
}
