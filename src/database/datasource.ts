import { DataSource, DataSourceOptions } from 'typeorm';
import { LinkEntity } from './entities/link.entity';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'username',
  password: 'password',
  database: 'database',
  entities: [LinkEntity],
  migrations: ['**/migrations/**'],
};

export const dataSource = new DataSource(dataSourceConfig);
