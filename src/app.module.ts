import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
