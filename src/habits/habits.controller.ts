import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Habit } from './entities/habit.entity';
import { EditHabit } from './edit/edit.service';
import { ApiTags } from '@nestjs/swagger';
import { RelationsService } from './relations/relations.service';
@ApiTags('habits')
@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService,
    private readonly editHabit: EditHabit,
    private readonly relationsService: RelationsService,
  ) {}
  @Post('create')
  @UseGuards(JwtGuard)
  async createHabit(
    @Req() req: { user: { id: number } },
    @Body() createHabitDto: CreateHabitDto,
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.habitsService.create(userId, createHabitDto);
  }
  @UseGuards(JwtGuard)
  @Get('friend/:habitId')
  async getFriendHabit(
    @Body('username') friend: string,
    @Param('habitId') habitId: number,
  ) {
    return this.relationsService.friendsHabit(friend, habitId);
  }
  @UseGuards(JwtGuard)
  @Get('relations')
  async getAllHabits(@Req() req: { user: { id: number } }) {
    return this.relationsService.getFriends(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getHabitById(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.habitsService.getById(userId, id);
  }
  @UseGuards(JwtGuard)
  @Put('change/:id/status')
  async updateHabitStatus(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
    @Body('status') status: 'doing' | 'success' | 'failed',
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.editHabit.updateStatus(userId, id, status);
  }

  @UseGuards(JwtGuard)
  @Put('change/:id/left')
  async updateHabitLeft(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
    @Body('left') left: number,
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.editHabit.updateLeft(userId, id, left);
  }

  @UseGuards(JwtGuard)
  @Put('change/:id/add-day')
  async addCompletedDay(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
    @Body('date') date: string,
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.editHabit.addCompletedDay(userId, id, date);
  }

  @UseGuards(JwtGuard)
  @Put('change/:id/remove-day')
  async removeCompletedDay(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
    @Body('date') date: string,
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.editHabit.removeCompletedDay(userId, id, date);
  }
  @UseGuards(JwtGuard)
  @Post('relations/add/:id')
  async addNewFriend(
    @Req() req: { user: { username: string } },
    @Body('username') friend: string,
    @Param('id') id: number,
  ) {
    return this.relationsService.addFriend(req.user.username, id, friend);
  }

  @UseGuards(JwtGuard)
  @Put('relations/public')
  async changeTypeOfPrivity(
    @Req() req: { user: { id: number } },
    @Body('public') privity: false | true,
  ) {}

  @UseGuards(JwtGuard)
  @Delete('remove/:id')
  async deleteHabit(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
  ) {
    const userId = req.user.id;
    return this.habitsService.deleteHabit(userId, id);
  }

  @UseGuards(JwtGuard)
  @Delete('relations/remove/:id')
  async removeFriend(
    @Req() req: { user: { username: string } },
    @Body('username') friend: string,
    @Param('id') habitId: number,
  ) {
    return this.relationsService.removeFriend(
      req.user.username,
      habitId,
      friend,
    );
  }
}
