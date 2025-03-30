import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService

  ) {}

  // get default route
  @Get('home')
  getHello(): string {
    return this.appService.getHello();
  }
}
