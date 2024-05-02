import { create } from 'zustand';
import { VehiclesApi } from '../api/VehiclesApi';

export interface CoreService {
  step: CoreStep;
  start(): void;
  goTo(step: CoreStep): void;
  loadLookups(): Promise<void>;
  saveVehicleParameters(): void;
}

export type CoreStep = 'initial' | 'splash' | 'setup' | 'spinner';

export const useCoreService = create<CoreService>((set, get) => ({
  step: 'initial',

  start: () => {
    get().goTo('splash');
  },

  goTo: (step: CoreStep) => {
    set({ step });
  },

  loadLookups: async () => {
    await VehiclesApi.getMakes();
    get().goTo('setup');
  },

  saveVehicleParameters: () => {
    get().goTo('spinner');
  },
}));
