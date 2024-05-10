import { create } from 'zustand';
import { VehiclesApi } from '../api/VehiclesApi';

export interface CoreService {
  step: CoreStep;
  make?: string;
  model?: string;
  year?: string;
  start(): void;
  goTo(step: CoreStep): void;
  loadLookups(): Promise<void>;
  setMake(make?: string): void;
  setModel(model?: string): void;
  setYear(year?: string): void;
  saveVehicleParameters(): void;
}

export type CoreStep = 'initial' | 'splash' | 'setup' | 'spinner';

export const CoreService = {
  use: create<CoreService>((set, get) => ({
    step: 'initial',
    make: undefined,
    model: undefined,
    year: undefined,

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

    setMake: (make?: string) => {
      set({ make });
    },

    setModel: (model?: string) => {
      set({ model });
    },

    setYear: (year?: string) => {
      set({ year });
    },

    saveVehicleParameters: () => {
      get().goTo('spinner');
    },
  })),

  selectors: {
    isValidSetup: () => CoreService.use(state => !!state.make && !!state.model && !!state.year),
  },
};
