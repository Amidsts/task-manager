import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      try {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'taskmanagement',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        });

        await dataSource.initialize();
        console.log('Database connected successfully');

        return dataSource;
      } catch (error) {
        console.log('error connecting to database');
        throw error;
      }
    },
  },
];
