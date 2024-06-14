import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from '../../database/entities/link.entity';
import { createHash, EHashFunction } from '../helpers/create-hash';
import {
  ECreateErrorCode,
  EProcessErrorCode,
  ICreateLinkInput,
  IOneTimeLinkService,
  IProcessLinkInput,
} from './interfaces';

@Injectable()
export class OneTimeLinkStoragePostgresService implements IOneTimeLinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly repository: Repository<LinkEntity>,
  ) {}

  public async createLink(
    input: ICreateLinkInput,
  ): Promise<[string, ECreateErrorCode]> {
    try {
      const { text } = input;
      const hashString = createHash(EHashFunction.sha512, text);
      const hash = Buffer.from(hashString, 'utf8');
      const linkEntity = await this.repository.findOne({ where: { hash } });
      const isExists = linkEntity !== null;
      if (isExists) {
        return [null, ECreateErrorCode.conflict];
      }
      await this.repository.insert({ hash, text });
      return [hashString, null];
    } catch (error) {
      return [null, ECreateErrorCode.storage];
    }
  }

  public async processLink(
    input: IProcessLinkInput,
  ): Promise<[string, EProcessErrorCode]> {
    try {
      const { hash: hashString } = input;
      const hash = Buffer.from(hashString, 'utf8');
      const linkEntity = await this.repository.findOne({ where: { hash } });
      const isExists = linkEntity !== null;
      if (!isExists) {
        return [null, EProcessErrorCode.notFound];
      }
      await this.repository.delete(linkEntity);
      return [linkEntity.text, null];
    } catch (error) {
      return [null, EProcessErrorCode.storage];
    }
  }
}
