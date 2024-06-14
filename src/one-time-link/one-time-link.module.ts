import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from '../database/entities/link.entity';
import { OneTimeLinkController } from './controllers/one-time-link.controller';
import { OneTimeLinkStoragePostgresService } from './services/one-time-link.storage-postgres.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  controllers: [OneTimeLinkController],
  providers: [OneTimeLinkStoragePostgresService],
})
export class OneTimeLinkModule {}
