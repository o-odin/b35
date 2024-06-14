import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './database/entities/link.entity';
import { OneTimeLinkModule } from './one-time-link/one-time-link.module';

@Module({
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
    OneTimeLinkModule,
  ],
})
export class ApplicationModule {}
