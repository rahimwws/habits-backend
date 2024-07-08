import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from 'src/habits/entities/habit.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  getStatus(username: string, status: 'success' | 'failed' | 'doing') {
    return this.habitsRepository.find({
      where: { user: { username }, status },
    });
  }

  async getAwards(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`${username} not found`);
    }
    return user.awards;
  }

  async getRate(username: string) {
    const habits = await this.habitsRepository.find({
      where: { user: { username } },
    });

    if (!habits) {
      throw new NotFoundException(`For ${username} not found his habits`);
    }
    const successRate =
      (habits.filter((habit) => habit.status === 'success').length /
        habits.length) *
      100;

    return successRate.toFixed(2);
  }
}
