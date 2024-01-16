import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from './index';
import { join } from 'path';

console.log(join(__dirname), '-----');

export const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.db.host,
  port: +config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.db,
  synchronize: false,
  logging: true,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
};

export default new DataSource(options);
