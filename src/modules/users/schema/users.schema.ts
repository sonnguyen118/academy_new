import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { InformationUsersEntity } from './information_users.schema';
import * as mongoose from 'mongoose'; // Import mongoose
import { RoleConfigEntity } from '@modules/auth/schema/role.schema';

export type Users = HydratedDocument<UsersEntity>;

@Schema({ collection: 'users' })
export class UsersEntity {
  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InformationUsersEntity',
  })
  information: InformationUsersEntity;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoleConfigEntity',
  })
  role: RoleConfigEntity;

  @Prop()
  isActive: boolean;

  @Prop()
  isDelete: boolean;

  @Prop()
  isValidate: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(UsersEntity);
