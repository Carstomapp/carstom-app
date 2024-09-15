import { create } from 'zustand';
import { NNApi } from '../api/NNApi';
import { VehiclesApi } from '../api/VehiclesApi';
import { VehicleBrand, VehicleModel, VehicleYear } from '../api/types';

export interface CoreService {
  step: CoreStep;
  brand?: string;
  model?: string;
  year?: string;
  brands: VehicleBrand[];
  models: VehicleModel[];
  years: VehicleYear[];
  isLoadingModels: boolean;
  isLoadingYears: boolean;
  isLoadingScene: boolean;
  isShowingLayout: boolean;
  isProcessing: boolean;
  start(): void;
  goTo(step: CoreStep): void;
  loadLookups(): Promise<void>;
  setBrand(brand?: string): Promise<void>;
  setModel(model?: string): Promise<void>;
  setYear(year?: string): void;
  saveVehicleParameters(): void;
  loadScene(onCameraInitialize?: () => Promise<void>): Promise<void>;
  showLayout(): void;
  processFrame(dataUrl: string): Promise<void>;
}

export type CoreStep = 'initial' | 'splash' | 'setup' | 'scene';

export const CoreService = {
  use: create<CoreService>((set, get) => ({
    step: 'initial',
    brand: undefined,
    model: undefined,
    year: undefined,
    brands: [],
    models: [],
    years: [],
    isLoadingModels: false,
    isLoadingYears: false,
    isLoadingScene: false,
    isShowingLayout: false,
    isProcessing: false,

    start: () => {
      get().goTo('splash');
    },

    goTo: (step: CoreStep) => {
      set({ step });
    },

    loadLookups: async () => {
      const brands = await VehiclesApi.getBrands();
      set({ brands });
      get().goTo('setup');
    },

    setBrand: async (brand?: string) => {
      set({
        brand,
        model: undefined,
        year: undefined,
        years: [],
        isLoadingModels: true,
        isLoadingYears: true,
      });

      if (brand) {
        const models = await VehiclesApi.getModels(brand);
        set({ models });
      } else {
        set({ models: [] });
      }

      set({
        isLoadingModels: false,
        isLoadingYears: false,
      });
    },

    setModel: async (model?: string) => {
      set({
        model,
        year: undefined,
        years: [],
        isLoadingYears: true,
      });

      if (model) {
        const years = await VehiclesApi.getYears(model);
        set({ years });
      } else {
        set({ years: [] });
      }

      set({ isLoadingYears: false });
    },

    setYear: (year?: string) => {
      set({ year });
    },

    saveVehicleParameters: () => {
      get().goTo('scene');
    },

    loadScene: async (onCameraInitialize?: () => Promise<void>) => {
      set({ isLoadingScene: true });

      const { brand, model, year } = get();

      if (brand && model && year) {
        await VehiclesApi.getCollections(brand, model, year);
      }

      await onCameraInitialize?.();

      set({ isLoadingScene: false });
    },

    showLayout: () => {
      set({ isShowingLayout: true });
    },

    processFrame: async (dataUrl: string) => {
      set({ isProcessing: true });

      await NNApi.processImage({
        image: dataUrl,
      });

      set({ isProcessing: false });
    },
  })),

  selectors: {
    isValidSetup: () => CoreService.use(state => !!state.brand && !!state.model && !!state.year),
  },
};
