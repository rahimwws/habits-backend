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
import { UpdateHabitDto } from './dto/update-habit.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Habit } from './entities/habit.entity';
import { EditHabit } from './edit/edit.service';

@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService,
    private readonly editHabit: EditHabit,
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
  @Get()
  async getAllHabits(@Req() req: { user: { id: number } }): Promise<Habit[]> {
    const userId = req.user.id;
    return this.habitsService.getAll(userId);
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
  @Put('edit/:id')
  async updateHabit(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
    @Body() updateHabitDto: Partial<UpdateHabitDto>,
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.habitsService.updateHabit(userId, id, updateHabitDto);
  }
  @UseGuards(JwtGuard)
  @Put('edit/:id/status')
  async updateHabitStatus(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
    @Body('status') status: 'doing' | 'success' | 'failed',
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.editHabit.updateStatus(userId, id, status);
  }

  @UseGuards(JwtGuard)
  @Put('edit/:id/left')
  async updateHabitLeft(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
    @Body('left') left: number,
  ): Promise<Habit> {
    const userId = req.user.id;
    return this.editHabit.updateLeft(userId, id, left);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteHabit(
    @Req() req: { user: { id: number } },
    @Param('id') id: number,
  ): Promise<void> {
    const userId = req.user.id;
    return this.habitsService.deleteHabit(userId, id);
  }
}
