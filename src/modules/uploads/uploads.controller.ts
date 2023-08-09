import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Roles } from '@modules/auth/guard/roles.decorator';
import { RolesGuard } from '@modules/auth/guard/roles.guard';
import config from '@config/index';
import { BaseResponse } from '@interface/base.response';

@Controller('v1/uploads')
export class UploadsController {
  @Post('')
  @UseGuards(RolesGuard)
  @Roles(config.supper_admin)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadFolder = req.body.folder || 'uploads';
          cb(null, uploadFolder);
        },
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          // Kiểm tra định dạng tệp hình ảnh
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async adminOnly(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('No image file uploaded!');
    }

    const data = {
      fieldname: file.fieldname,
      path: file.path.replace('\\', '/'),
      imageURL: config.base_url + '/' + file.path.replace('\\', '/'),
    };

    return new BaseResponse('upload photo successfully', data, 201);
  }

  @Post('/multiple')
  @UseGuards(RolesGuard)
  @Roles(config.supper_admin)
  @UseInterceptors(
    FilesInterceptor('photo', 3, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadFolder = req.body.folder || 'uploads';
          cb(null, uploadFolder);
        },
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          // Kiểm tra định dạng tệp hình ảnh
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadPhotos(@UploadedFiles() files) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No image files uploaded!');
    }

    const uploadedFiles = files.map((file) => ({
      fieldname: file.fieldname,
      path: file.path.replace('\\', '/'),
      imageURL: config.base_url + '/' + file.path.replace('\\', '/'),
    }));

    return new BaseResponse('Upload photos successfully', uploadedFiles, 201);
  }
}
