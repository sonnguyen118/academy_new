import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  HttpCode,
  UseGuards,
  ParseIntPipe,
  Query,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { ChangePassWordUserDto } from './dto/update-users.dto';
import { ApiTags } from '@nestjs/swagger';
import { BadRequest } from '@exceptions/BadRequest';
import config from '@config/index';
import { Roles } from '@modules/auth/guard/roles.decorator';
import { RolesGuard } from '@modules/auth/guard/roles.guard';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-admin')
  @HttpCode(201)
  // @UseGuards(RolesGuard)
  // @Roles(config.supper_admin)
  async createSuperAdmin(@Body() createUserDto: CreateUsersDto) {
    try {
      return this.usersService.createSuperAdmin(createUserDto);
    } catch (err) {
      return new BadRequest(err.message);
    }
  }

  @Post('/create-student')
  @HttpCode(201)
  @UseGuards(RolesGuard)
  @Roles(config.supper_admin)
  async createStudent(@Body() createUserDto: CreateUsersDto) {
    try {
      return this.usersService.createStudent(createUserDto);
    } catch (err) {
      return new BadRequest(err.message);
    }
  }

  @Put('/validate-student')
  @HttpCode(201)
  @UseGuards(RolesGuard)
  @Roles(config.student)
  async changeStudentPassword(
    @Body() changePassWordUserDto: ChangePassWordUserDto,
  ) {
    try {
      return this.usersService.changeStudentPassword(changePassWordUserDto);
    } catch (err) {
      return new BadRequest(err.message);
    }
  }
}
