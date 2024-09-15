import { create } from 'zustand';
import { NNApi } from '../api/NNApi';
import { NNCoordinates } from '../api/types';

export interface ARService {
  frameStatus: ARFrameStatus;
  coordinates: NNCoordinates[];
  isProcessing: boolean;
  processFrame(dataUrl: string): Promise<void>;
}

export type ARFrameStatus = 'none' | 'error' | 'valid';

export const ARService = {
  use: create<ARService>((set, get) => ({
    frameStatus: 'none',
    coordinates: [],
    isProcessing: false,

    processFrame: async (dataUrl: string) => {
      set({
        coordinates: [],
        isProcessing: true,
      });

      const response = await NNApi.processImage({
        image: dataUrl,
      });

      set({
        coordinates: response.data.coordinates,
        isProcessing: false,
      });
    },
  })),
};
