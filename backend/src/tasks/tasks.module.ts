import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TasksController } from './controllers/tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksService } from './services/tasks.service';
import configuration from '../config/configuration';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { secret, expiration } = configService.jwt;
        return {
          secret,
          signOptions: { expiresIn: expiration || '15m' },
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
