import { AxiosResponse } from 'axios';
import { client } from './axios';
import { NNCoordinates, NNProcessImageRequest } from './types';

export abstract class NNApi {
  public static async processImage(request: NNProcessImageRequest): Promise<AxiosResponse<NNCoordinates>> {
    const response = await client.post<NNCoordinates>('/api/v1/nn', request);
    return response;
  }
}
