import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type StudyFlow = HydratedDocument<StudyFlowEntity>;

@Schema({ collection: 'study_flow' })
export class StudyFlowEntity {
  @Prop()
  name: string;

  @Prop()
  numberSessions: number;

  @Prop()
  totalTuitionFee: number;

  @Prop()
  maximumDaysOff: number;

  @Prop()
  numberExercises: number;

  @Prop()
  estimatedExamDate: Date;

  @Prop()
  note: string;

  @Prop()
  isActive: boolean;

  @Prop()
  isDelete: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const StudyFlowSchema = SchemaFactory.createForClass(StudyFlowEntity);
