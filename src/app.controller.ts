import { Controller, Body, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'
import { join } from 'path'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  serveHome(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'dist-client', 'home.html'))
  }

  @Get('add')
  serveAdd(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'dist-client', 'add.html'))
  }

  @Get('api')
  getThemAll() {
    return this.appService.findAll();
  }

  @Post('api/create')
  async create(
    @Body() body,
    @Res() res: Response
  ) {
    let id = await this.appService.create(body)
    res.redirect(`/program/${id}`)
  }

  @Get('program/:id')
  getProgram(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'dist-client', 'program.html'))
  }
}
