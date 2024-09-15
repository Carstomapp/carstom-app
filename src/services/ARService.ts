import { create } from 'zustand';
import { NNApi } from '../api/NNApi';

export interface ARService {
  frameStatus: ARFrameStatus;
  isProcessing: boolean;
  processFrame(dataUrl: string): Promise<void>;
}

export type ARFrameStatus = 'none' | 'error' | 'valid';

export const ARService = {
  use: create<ARService>((set, get) => ({
    frameStatus: 'none',
    isProcessing: false,

    processFrame: async (dataUrl: string) => {
      set({ isProcessing: true });

      await NNApi.processImage({
        image: dataUrl,
      });

      set({ isProcessing: false });
    },
  })),
};
