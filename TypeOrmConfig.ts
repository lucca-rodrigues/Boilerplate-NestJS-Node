import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'boilerplate',
  password: 'boilerplate',
  database: 'boilerplate',
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'MigrationHistory',
  entities: ['src/Database/Entities/**/*.entity{.ts,.js}'],
  migrations: ['src/Database/Migrations/**'],
  cli: {
    entitiesDir: 'src/Database/Entities',
    migrationsDir: 'src/Database/Migrations',
  },
};

export = config;
