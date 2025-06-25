import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true, versionKey: false })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    enum: ['planning', 'in_progress', 'completed', 'cancelled'],
    default: 'planning',
  })
  status: string;

  @Prop({ enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  managerId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  developersIds: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
