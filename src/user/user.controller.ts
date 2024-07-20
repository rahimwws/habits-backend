import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @UseGuards(JwtGuard)
  @Get()
  getUser(@Req() req: { user: { username: string } }) {
    return this.service.getInfo(req.user.username);
  }

  @UseGuards(JwtGuard)
  @Put('change/name')
  changeName(
    @Req() req: { user: { username: string } },
    @Body('name') newName: string,
  ) {
    return this.service.changeName(req.user.username, newName);
  }
  @UseGuards(JwtGuard)
  @Put('change/age')
  changeAge(
    @Req() req: { user: { username: string } },
    @Body('age') age: number,
  ) {
    return this.service.changeAge(req.user.username, age);
  }
  @UseGuards(JwtGuard)
  @Post('change/password')
  changePassword(
    @Req() req: { user: { username: string } },
    @Body('new') newPassword: string,
    @Body('old') oldPassword: string,
  ) {
    return this.service.changePassword(
      req.user.username,
      newPassword,
      oldPassword,
    );
  }

  @UseGuards(JwtGuard)
  @Get('habits')
  getHabits(@Req() req: { user: { username: string } }) {
    return this.service.getHabits(req.user.username);
  }
  @UseGuards(JwtGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: { username: string } },
  ) {
    return await this.service.uploadAvatar(file, req.user.username);
  }
}
