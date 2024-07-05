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
import { ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { LocalGuard } from 'src/auth/guards/local.guards';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly service: FriendsService) {}
  @UseGuards(JwtGuard)
  @Post('request')
  sendFriendRequest(
    @Req() req: { user: { username: string } },
    @Body('username') username: string,
  ) {
    return this.service.sendFriendRequest(req.user.username, username);
  }

  @UseGuards(JwtGuard)
  @Get('requests')
  getFriendRequests(@Req() req: { user: { username: string } }) {
    return this.service.getRequests(req.user.username);
  }
  @UseGuards(JwtGuard)
  @Post('accept')
  acceptFriendRequest(
    @Req() req: { user: { username: string } },
    @Body('username') username: string,
  ) {
    return this.service.acceptFriendRequest(req.user.username, username);
  }
  @UseGuards(JwtGuard)
  @Delete('reject')
  rejectFriendRequest(
    @Req() req: { user: { username: string } },
    @Body('username') username: string,
  ) {
    return this.service.rejectFriendRequest(req.user.username, username);
  }
  @UseGuards(JwtGuard)
  @Delete('remove')
  async removeFriend(
    @Body('username') username: string,
    @Req() req: { user: { username: string } },
  ) {
    await this.service.removeFriend(req.user.username, username);
    return { message: `Removed friend ${username}` };
  }
}
