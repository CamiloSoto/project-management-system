import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import configuration from '../config/configuration';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
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
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
