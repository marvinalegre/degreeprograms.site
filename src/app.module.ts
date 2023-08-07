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
      rootPath: join(__dirname, '..', 'dist-client', 'assets'),
      serveRoot: '/assets',
      renderPath: ' '
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
