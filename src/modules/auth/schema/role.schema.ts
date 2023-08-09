import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UsersRole = HydratedDocument<RoleConfigEntity>;
@Schema({ collection: 'role_config' })
export class RoleConfigEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  })
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;
}

export const RoleConfigSchema = SchemaFactory.createForClass(RoleConfigEntity);
