import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  // getAllTasks() {
  //   return this.tasks;
  // }

  async findTaskByID(id: number): Promise<Task>{
    const task = await this.taskRepository.findOne({where: {id}})
      if (!task) {
        throw new NotFoundException('task not found');
    }
    
    return task;
  }
  // getTaskByID(id: string) {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException('task not found');
  //   }

  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuidv4(),
  //     status: TaskStatus.OPEN,
  //     description,
  //     title,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string) {
  //   const found = this.getTaskByID(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskByID(id);
  //   task.status = status;
  //   return task;
  // }
}
