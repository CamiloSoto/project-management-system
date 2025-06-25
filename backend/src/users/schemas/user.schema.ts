import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: ['admin', 'manager', 'developer'], default: 'developer' })
    role: 'admin' | 'manager' | 'developer';

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
