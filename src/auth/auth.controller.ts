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
import { CreateUserDto, LoginDto, VerificationDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
  @Post('check/username')
  checkUsername(@Body('username') username: string) {
    return this.authService.checkUsername(username);
  }

  @Get('user')
  @UseGuards(JwtGuard)
  users(@Req() req: { user: { id: number } }) {
    return this.authService.getAllUsers(req.user.id);
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
