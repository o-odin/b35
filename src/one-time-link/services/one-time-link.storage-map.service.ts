import { Injectable } from '@nestjs/common';
import { createHash, EHashFunction } from '../helpers/create-hash';
import {
  ECreateErrorCode,
  EProcessErrorCode,
  ICreateLinkInput,
  IOneTimeLinkService,
  IProcessLinkInput,
} from './interfaces';

@Injectable()
export class OneTimeLinkStorageMapService implements IOneTimeLinkService {
  private map = new Map<string, string>();

  public async createLink(
    input: ICreateLinkInput,
  ): Promise<[string, ECreateErrorCode]> {
    const { text } = input;
    const hash = createHash(EHashFunction.sha512, text);
    const isExists = this.map.has(hash);
    if (isExists) {
      return [null, ECreateErrorCode.conflict];
    }
    this.map.set(hash, text);
    return [hash, null];
  }

  public async processLink(
    input: IProcessLinkInput,
  ): Promise<[string, EProcessErrorCode]> {
    const { hash } = input;
    const text = this.map.get(hash);
    if (!text) {
      return [null, EProcessErrorCode.notFound];
    }
    this.map.delete(hash);
    return [text, null];
  }
}
