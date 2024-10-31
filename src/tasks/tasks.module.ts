import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from 'src/Database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
