import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { StudyFlowEntity } from './study_flow.entity';

export type Course = HydratedDocument<CourseEntity>;

@Schema({ collection: 'course' })
export class CourseEntity {
  @Prop()
  name: string;

  @Prop()
  totalTuitionFee: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  numberSessions: number;

  @Prop()
  note: string;

  @Prop()
  isActive: boolean;

  @Prop()
  isDelete: boolean;

  @Prop()
  avatar: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'StudyFlowEntity' }])
  imageStudyFlow: StudyFlowEntity[];

  @Prop()
  studyFlow: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(CourseEntity);
