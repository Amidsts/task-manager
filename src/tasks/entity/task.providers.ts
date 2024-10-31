import { DataSource } from 'typeorm';
import { Task } from './task.entity';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (datasource: DataSource) => datasource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
