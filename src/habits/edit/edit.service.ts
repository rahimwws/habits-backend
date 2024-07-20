import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from '../entities/habit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EditHabit {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
  ) {}

  async updateStatus(
    userId: number,
    habitId: number,
    status: 'doing' | 'success' | 'failed',
  ): Promise<Habit> {
    const habit = await this.habitsRepository.findOne({
      where: { id: habitId, user: { id: userId } },
    });
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    habit.status = status;

    return this.habitsRepository.save(habit);
  }

  async updateLeft(
    userId: number,
    habitId: number,
    left: number,
  ): Promise<Habit> {
    const habit = await this.habitsRepository.findOne({
      where: { id: habitId, user: { id: userId } },
    });
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    habit.remain = left;
    return this.habitsRepository.save(habit);
  }

  async addCompletedDay(userId: number, habitId: number, date: string) {
    const habit = await this.habitsRepository.findOne({
      where: { id: habitId, user: { id: userId } },
    });
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }
    for (const day of habit.completedDays) {
      if (day.date === date) {
        throw new NotFoundException('Day already added');
      }
    }
    habit.completedDays.push({ date, status: 'success' });
    return this.habitsRepository.save(habit);
  }

  async removeCompletedDay(
    userId: number,
    habitId: number,
    date: string,
  ): Promise<Habit> {
    const habit = await this.habitsRepository.findOne({
      where: { id: habitId, user: { id: userId } },
    });
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    habit.completedDays = habit.completedDays.filter(
      (day) => day.date !== date,
    );
    return this.habitsRepository.save(habit);
  }
}
