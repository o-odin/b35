import * as request from 'supertest';
import {
  HttpStatus,
  INestApplication,
  ModuleMetadata,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ApplicationModule } from '../src/application.module';
import {
  createHash,
  EHashFunction,
} from '../src/one-time-link/helpers/create-hash';
import {
  ICreateLinkInput,
  IProcessLinkInput,
} from '../src/one-time-link/services/interfaces';

describe('OneTimeLinkController (e2e)', (): void => {
  let app: INestApplication;

  beforeAll(async (): Promise<void> => {
    const moduleMetadata: ModuleMetadata = {
      imports: [ApplicationModule],
    };
    const testingModuleBuilder = Test.createTestingModule(moduleMetadata);
    const testingModule = await testingModuleBuilder.compile();
    app = testingModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  const text = '0123456789';
  const hash = createHash(EHashFunction.sha512, text);

  it('/api/one-time-link/create - success', () => {
    return request(app.getHttpServer())
      .get('/api/one-time-link/create')
      .query(<ICreateLinkInput>{ text })
      .expect(HttpStatus.CREATED)
      .expect(`/api/one-time-link/process?hash=${hash}`);
  });

  it('/api/one-time-link/create - conflict', () => {
    return request(app.getHttpServer())
      .get('/api/one-time-link/create')
      .query(<ICreateLinkInput>{ text })
      .expect(HttpStatus.CONFLICT);
  });

  it('/api/one-time-link/process - success', () => {
    return request(app.getHttpServer())
      .get('/api/one-time-link/process')
      .query(<IProcessLinkInput>{ hash })
      .expect(HttpStatus.OK)
      .expect(text);
  });

  it('/api/one-time-link/process - not found', () => {
    return request(app.getHttpServer())
      .get('/api/one-time-link/process')
      .query(<IProcessLinkInput>{ hash })
      .expect(HttpStatus.NOT_FOUND);
  });
});
