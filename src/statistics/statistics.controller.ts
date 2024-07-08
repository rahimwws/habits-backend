import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@ApiTags('statistics')
export class StatisticsController {
  constructor(private readonly service: StatisticsService) {}
  @Get('success')
  @UseGuards(JwtGuard)
  getSuccessStats(@Req() req: { user: { username: string } }) {
    return this.service.getStatus(req.user.username, 'success');
  }

  @Get('inprogress')
  @UseGuards(JwtGuard)
  getDoing(@Req() req: { user: { username: string } }) {
    return this.service.getStatus(req.user.username, 'doing');
  }

  @Get('failed')
  @UseGuards(JwtGuard)
  getFailed(@Req() req: { user: { username: string } }) {
    return this.service.getStatus(req.user.username, 'failed');
  }
  @Get('awards')
  @UseGuards(JwtGuard)
  getAwards(@Req() req: { user: { username: string } }) {
    return this.service.getAwards(req.user.username);
  }
  @Get('rate')
  @UseGuards(JwtGuard)
  getRate(@Req() req: { user: { username: string } }) {
    return this.service.getRate(req.user.username);
  }
}
