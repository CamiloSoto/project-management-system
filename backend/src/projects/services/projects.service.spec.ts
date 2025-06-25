import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { ProjectsService } from './projects.service';
import { Project } from '../schemas/project.schema';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let model: any;

  const mockProject = {
    _id: 'proj123',
    name: 'Project 1',
    description: 'Some description',
    managerId: 'manager123',
    developersIds: ['dev1', 'dev2'],
  };

  const modelMock = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([mockProject]),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken(Project.name),
          useValue: modelMock,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    model = module.get(getModelToken(Project.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a project', async () => {
      const dto: ProjectDto = {
        name: 'Project 1',
        description: 'Some description',
        managerId: 'manager123',
        developersIds: ['dev1', 'dev2'],
      };

      model.create.mockResolvedValue({ ...dto, _id: 'proj123' });

      const result = await service.create(dto, 'user123');
      expect(result).toEqual({ ...dto, _id: 'proj123' });
      expect(model.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all projects for a user and filters', async () => {
      const filters = {
        status: 'planning',
        priority: 'high',
        text: '',
      };

      const userId = 'user123';

      await service.findAll(userId, filters);

      expect(model.find).toHaveBeenCalledWith({
        developersIds: userId,
        status: 'planning',
        priority: 'high',
      });

      expect(model.populate).toHaveBeenCalledWith('managerId developersIds');
      expect(model.exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a project by id', async () => {
      const execMock = jest.fn().mockResolvedValue(mockProject);
      const populateMock = jest.fn().mockReturnValue({ exec: execMock });

      model.findById.mockReturnValue({ populate: populateMock });

      const result = await service.findOne('proj123');
      expect(result).toEqual(mockProject);
      expect(model.findById).toHaveBeenCalledWith('proj123');
      expect(populateMock).toHaveBeenCalledWith('managerId developersIds');
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const updated = { ...mockProject, name: 'Updated Project' };

      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updated),
      });

      const result = await service.update('proj123', {
        name: 'Updated Project',
      });
      expect(result).toEqual(updated);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'proj123',
        { name: 'Updated Project' },
        { new: true },
      );
    });
  });

  describe('delete', () => {
    it('should delete a project', async () => {
      model.findByIdAndDelete.mockResolvedValue(mockProject);

      const result = await service.delete('proj123');
      expect(result).toEqual(mockProject);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('proj123');
    });
  });
});
