import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '@modules/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule here
import { UsersEntity, UsersSchema } from '@modules/users/schema/users.schema'; // Import UsersSchema here
import { RoleConfigEntity, RoleConfigSchema } from './schema/role.schema'; // Import RoleConfigSchema here
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: RoleConfigEntity.name, schema: RoleConfigSchema },
      { name: UsersEntity.name, schema: UsersSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
