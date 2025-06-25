import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task, TaskDocument } from '../schemas/task.schema';
import { TaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { TaskFilterDto } from '../dtos/task-filter.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private model: Model<TaskDocument>) {}

  async create(projectId: any, data: TaskDto) {
    return this.model.create({ ...data, projectId });
  }

  async findAll(projectId: string, filters: TaskFilterDto) {
    const query: any = {
      developersIds: projectId,
    };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    if (filters.assignedTo) {
      const regex = { $regex: filters.assignedTo, $options: 'i' }; // insensitive LIKE
      query.$or = [{ assignedTo: regex }];
    }

    return this.model.find(query).populate('assignedTo projectId').exec();
  }

  async findOne(id: string) {
    return this.model.findById(id).populate('assignedTo').exec();
  }

  async update(id: string, data: UpdateTaskDto) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
