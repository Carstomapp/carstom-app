import { create } from 'zustand';

export interface ARService {
  frameStatus: ARFrameStatus;
}

export type ARFrameStatus = 'none' | 'error' | 'valid';

export const ARService = {
  use: create<ARService>((set, get) => ({
    frameStatus: 'none',
  })),
};
