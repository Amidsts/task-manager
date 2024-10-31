import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [...databaseProviders],
  imports: [],
  exports: [DataSource],
})
export class DatabaseModule {}
