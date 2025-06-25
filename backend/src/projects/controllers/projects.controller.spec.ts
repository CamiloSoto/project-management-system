import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

import { ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { ProjectsService } from '../services/projects.service';
import { ProjectsController } from './projects.controller';
import { AuthGuard } from '../../auth/guards/auth.guard';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockProject: any = {
    _id: '1',
    __v: 0,
    name: 'Project A',
    description: 'Project A Description',
    developersIds: ['dev1'],
    managerId: 'manager1',
  };

  const req = { user: { sub: 'user123' } } as unknown as Request;

  const dto: ProjectDto = {
    name: 'Project A',
    description: 'Project A Description',
    managerId: 'manager1',
    developersIds: ['dev1'],
  };

  @Injectable()
  class MockAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
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

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should create a project', async () => {
    jest.spyOn(service, 'create').mockResolvedValue({
      ...mockProject,
      ...dto,
    });

    const result = await controller.create(dto, req);
    expect(result).toEqual({ ...mockProject, ...dto });
    expect(service.create).toHaveBeenCalledWith({ ...dto }, 'user123');
  });

  it('should return all projects for user', async () => {
    const filters = {
      status: 'planning',
      priority: 'medium',
      text: 'test',
    };

    jest.spyOn(service, 'findAll').mockResolvedValue([mockProject]);

    const result = await controller.findAll(filters, req);
    expect(result).toEqual([mockProject]);
    expect(service.findAll).toHaveBeenCalledWith('user123', filters);
  });

  it('should return a project by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockProject);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockProject);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a project', async () => {
    const updateDto: UpdateProjectDto = {
      name: 'Updated Project',
      description: 'Updated description',
      managerId: 'manager1',
      developersIds: ['dev1', 'dev2'],
    };

    jest.spyOn(service, 'update').mockResolvedValue({
      ...mockProject,
      ...updateDto,
    });

    const result = await controller.update('1', updateDto);
    expect(result).toEqual({ ...mockProject, ...updateDto });
    expect(service.update).toHaveBeenCalledWith('1', updateDto);
  });

  it('should delete a project', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(mockProject);

    const result = await controller.delete('1');
    expect(result).toEqual(mockProject);
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
