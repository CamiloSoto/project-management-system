import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';

import { TaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { TasksService } from '../services/tasks.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { TasksController } from './tasks.controller';
import { TaskFilterDto } from '../dtos/task-filter.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: jest.Mocked<TasksService>;

  const mockTask: any = {
    _id: new Types.ObjectId(),
    title: 'Test Task',
    description: 'This is a test task',
    status: 'todo',
    priority: 'high',
    projectId: new Types.ObjectId(),
    assignedTo: new Types.ObjectId(),
    __v: 0,
  };

  @Injectable()
  class MockAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: AuthGuard,
          useClass: MockAuthGuard,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get(TasksService);
  });

  it('should create a task', async () => {
    const dto: TaskDto = {
      title: 'Test Task',
      description: 'Description',
      status: 'todo',
      priority: 'medium',
      assignedTo: 'user123',
      estimatedHours: 5,
      actualHours: 0,
      dueDate: new Date(),
    };

    service.create.mockResolvedValue({ ...mockTask, ...dto } as any);

    const result = await controller.create('project123', dto);
    expect(result).toEqual({ ...mockTask, ...dto });
    expect(service.create).toHaveBeenCalledWith('project123', dto);
  });

  it('should return all tasks for a project', async () => {
    const filters: TaskFilterDto = {
      status: 'todo',
      priority: 'medium',
      assignedTo: '',
    };
    jest.spyOn(service, 'findAll').mockResolvedValue([mockTask]);

    service.findAll.mockResolvedValue([mockTask] as any[]);

    const result = await controller.findAll(filters, 'project123');
    expect(result).toEqual([mockTask]);
    expect(service.findAll).toHaveBeenCalledWith('project123', filters);
  });

  it('should update a task', async () => {
    const dto: UpdateTaskDto = {
      title: 'Updated Task',
      status: 'in_progress',
    };

    service.update.mockResolvedValue({ ...mockTask, ...dto } as any);

    const result = await controller.update('task123', dto);
    expect(result).toEqual({ ...mockTask, ...dto });
    expect(service.update).toHaveBeenCalledWith('task123', dto);
  });

  it('should delete a task', async () => {
    service.delete.mockResolvedValue(mockTask as any);

    const result = await controller.delete('task123');
    expect(result).toEqual(mockTask);
    expect(service.delete).toHaveBeenCalledWith('task123');
  });
});
