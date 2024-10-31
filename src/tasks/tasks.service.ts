import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.types';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class TasksService {
  private taskRepository: Repository<Task>;

  constructor(private dataSource: DataSource) {
    this.taskRepository = this.dataSource.getRepository(Task);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { title, description } = createTaskDto;
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      await task.save();

      return task;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong please try again',
      );
    }
  }

  async findTaskByID(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (!task) {
        throw new NotFoundException('task not found');
      }

      return task;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong please try again',
      );
    }
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskByID(id);
  //   task.status = status;
  //   return task;
  // }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('task not found');
    }

    task.status = status;
    await task.save();

    return task;
  }

  async deleteTask(id: number) {
    await this.taskRepository.delete({ id });
  }
}
