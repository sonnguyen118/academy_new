import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity, UsersSchema } from './schema/users.schema';
import {
  InformationUsersEntity,
  InformationUsersSchema,
} from './schema/information_users.schema';
import {
  RoleConfigEntity,
  RoleConfigSchema,
} from '@modules/auth/schema/role.schema';
import { Roles } from '@modules/auth/guard/roles.decorator';
import { RolesGuard } from '@modules/auth/guard/roles.guard';
import { AuthModule } from '@modules/auth/auth.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: RoleConfigEntity.name, schema: RoleConfigSchema },
      { name: UsersEntity.name, schema: UsersSchema },
      { name: InformationUsersEntity.name, schema: InformationUsersSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule],
})
export class UsersModule {}
