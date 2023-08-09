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

import { ApiTags } from '@nestjs/swagger';
import { BadRequest } from '@exceptions/BadRequest';
import config from '@config/index';
import { Roles } from '@modules/auth/guard/roles.decorator';
import { RolesGuard } from '@modules/auth/guard/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  @HttpCode(201)
  @UseGuards(RolesGuard)
  @Roles(config.supper_admin)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }
}
