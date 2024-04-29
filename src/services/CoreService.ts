import { create } from 'zustand';
import { VehiclesApi } from '../api/VehiclesApi';

export interface CoreService {
  splashOpen: boolean;
  openSplash(): void;
  closeSplash(): void;
  loadLookups(): Promise<void>;
}

export const useCoreService = create<CoreService>((set, get) => ({
  splashOpen: false,

  openSplash: () => set({ splashOpen: true }),

  closeSplash: () => set({ splashOpen: false }),

  loadLookups: async () => {
    await VehiclesApi.getMakes();
    get().closeSplash();
  },
}));
