import { AxiosResponse } from 'axios';
import { client } from './axios';
import { NNProcessImageRequest, NNProcessImageResponse } from './types';

export abstract class NNApi {
  public static async processImage(request: NNProcessImageRequest): Promise<AxiosResponse<NNProcessImageResponse>> {
    const response = await client.post<NNProcessImageResponse>('/api/v1/nn', request);
    return response;
  }
}
