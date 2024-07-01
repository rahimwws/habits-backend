import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { VerificationDto, authDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }
  @Post('register')
  register(@Body() user: authDto) {
    return this.authService.register(user);
  }

  @Get('users')
  @UseGuards(JwtGuard)
  users() {
    return this.authService.getAllUsers();
  }
  @Post('verify-code')
  verifyCode(@Body() verification: VerificationDto) {
    return this.authService.verifyCode(verification);
  }
  @Delete('users/:username')
  @UseGuards(JwtGuard)
  async deleteUser(@Param('username') username: string) {
    return this.authService.deleteUserByUsername(username);
  }
}
