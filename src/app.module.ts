import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import config from '@config/index';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongo_url),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
