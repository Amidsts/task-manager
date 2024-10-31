import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.types';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async findTaskById(@Param('id') id: number): Promise<Task> {
    return await this.tasksService.findTaskByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number) {
    await this.tasksService.deleteTask(id);
  }

  @Patch()
  updateTaskStatus(
    @Query('id') id: number,
    @Query('status') status: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
