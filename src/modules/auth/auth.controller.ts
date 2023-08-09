import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Roles } from '@modules/auth/guard/roles.decorator';
import { RolesGuard } from '@modules/auth/guard/roles.guard';
import config from '@config/index';
import { BadRequest } from '@exceptions/BadRequest';

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login' })
  @Post('login-admin')
  @HttpCode(200)
  loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }

  @Post('login-student')
  @HttpCode(200)
  loginStudent(@Body() dto: LoginDto) {
    return this.authService.loginStudent(dto);
  }

  @Get('/check-user')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(config.supper_admin, config.teacher_admin)
  async checkUserAdmin(@Req() req: any) {
    try {
      return this.authService.checkUserAdmin(req);
    } catch (err) {
      return new BadRequest(err.message);
    }
  }

  @Get('/check-student')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(config.student)
  async checkUserStudent(@Req() req: any) {
    try {
      return this.authService.checkUserStudent(req);
    } catch (err) {
      return new BadRequest(err.message);
    }
  }
}
