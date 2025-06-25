import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { TaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { TaskFilterDto } from '../dtos/task-filter.dto';

describe('TasksService', () => {
  let service: TasksService;
  let model: any;

  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    projectId: 'project123',
    assignedTo: 'user456',
  };

  const modelMock = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([mockTask]),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: modelMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get(getModelToken(Task.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a task with projectId', async () => {
      const dto: TaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        assignedTo: 'user456',
        status: 'todo',
        priority: 'medium',
        estimatedHours: 5,
        actualHours: 0,
        dueDate: new Date(),
      };

      const result = { ...dto, _id: '1', projectId: 'project123' };
      model.create.mockResolvedValue(result);

      const created = await service.create('project123', dto);
      expect(created).toEqual(result);
      expect(model.create).toHaveBeenCalledWith({
        ...dto,
        projectId: 'project123',
      });
    });
  });

  describe('findAll', () => {
    it('should find all tasks by projectId and filters', async () => {
      const filters: TaskFilterDto = {
        status: 'planning',
        priority: 'high',
        assignedTo: 'userId',
      }

      const projectId = 'projectId';

      await  service.findAll(projectId, filters);

      expect(model.find).toHaveBeenCalledWith({
        projectId,
        status: 'planning',
        priority: 'high',
        $or: [
          { assignedTo: { $regex: 'userId', $options: 'i' } },
        ],
      });

      expect(model.populate).toHaveBeenCalledWith('assignedTo projectId');
      expect(model.exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find one task by id and populate assignedTo', async () => {
      const execMock = jest.fn().mockResolvedValue(mockTask);
      const populateMock = jest.fn().mockReturnValue({ exec: execMock });

      model.findById.mockReturnValue({ populate: populateMock });

      const result = await service.findOne('1');
      expect(result).toEqual(mockTask);
      expect(model.findById).toHaveBeenCalledWith('1');
      expect(populateMock).toHaveBeenCalledWith('assignedTo');
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const dto: UpdateTaskDto = { title: 'Updated Task' };
      const updated = { ...mockTask, ...dto };

      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updated),
      });

      const result = await service.update('1', dto);
      expect(result).toEqual(updated);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', dto, {
        new: true,
      });
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      model.findByIdAndDelete.mockResolvedValue(mockTask);

      const result = await service.delete('1');
      expect(result).toEqual(mockTask);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
