import { ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from '../../database/entities/link.entity';
import { createHash, EHashFunction } from '../helpers/create-hash';
import {
  ECreateErrorCode,
  EProcessErrorCode,
  ICreateLinkInput,
  IProcessLinkInput,
} from './interfaces';
import { OneTimeLinkStoragePostgresService } from './one-time-link.storage-postgres.service';

describe('OneTimeLinkService', (): void => {
  let service: OneTimeLinkStoragePostgresService;

  beforeAll(async (): Promise<void> => {
    const moduleMetadata: ModuleMetadata = {
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'username',
          password: 'password',
          database: 'database',
          entities: [LinkEntity],
        }),
        TypeOrmModule.forFeature([LinkEntity]),
      ],
      providers: [OneTimeLinkStoragePostgresService],
    };
    const testingModuleBuilder = Test.createTestingModule(moduleMetadata);
    const testingModule = await testingModuleBuilder.compile();
    service = testingModule.get(OneTimeLinkStoragePostgresService);
  });

  const text = '0123456789';
  const hash = createHash(EHashFunction.sha512, text);

  it('create - success', async (): Promise<void> => {
    const input: ICreateLinkInput = { text };
    const [link, error] = await service.createLink(input);
    expect(error).toBeNull();
    expect(link).toEqual(hash);
  });

  it('create - conflict', async (): Promise<void> => {
    const input: ICreateLinkInput = { text };
    const [link, error] = await service.createLink(input);
    expect(link).toBeNull();
    expect(error).toEqual(ECreateErrorCode.conflict);
  });

  it('process - success', async (): Promise<void> => {
    const input: IProcessLinkInput = { hash: hash };
    const [text, error] = await service.processLink(input);
    expect(error).toBeNull();
    expect(text).toEqual(text);
  });

  it('process - missed', async (): Promise<void> => {
    const input: IProcessLinkInput = { hash: hash };
    const [text, error] = await service.processLink(input);
    expect(text).toBeNull();
    expect(error).toEqual(EProcessErrorCode.notFound);
  });
});
