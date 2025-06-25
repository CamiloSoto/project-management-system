import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Project, ProjectDocument } from '../schemas/project.schema';
import { ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { ProjectFilterDto } from '../dtos/project-filter.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private model: Model<ProjectDocument>,
  ) {}

  async create(data: ProjectDto, userId: string) {
    return this.model.create(data);
  }

  async findAll(
    userId: string,
    filters: ProjectFilterDto,
  ) {
    const query: any = {
      developersIds: userId,
    };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    if (filters.text) {
      const regex = { $regex: filters.text, $options: 'i' }; // insensitive LIKE
      query.$or = [{ name: regex }, { description: regex }];
    }
    return this.model
      .find(query)
      .populate('managerId developersIds')
      .exec();
  }

  async findOne(id: string) {
    return this.model.findById(id).populate('managerId developersIds').exec();
  }

  async update(id: string, data: UpdateProjectDto) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
