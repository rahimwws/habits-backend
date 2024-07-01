import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entities/habit.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateHabitDto } from './dto/create-habit.dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userId: number, habitData: CreateHabitDto): Promise<Habit> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const habit = this.habitsRepository.create({
      ...habitData,
      user,
    });
    return this.habitsRepository.save(habit);
  }

  async getAll(userId: number): Promise<Habit[]> {
    return this.habitsRepository.find({ where: { user: { id: userId } } });
  }

  async getById(userId: number, id: number): Promise<Habit> {
    const habit = await this.habitsRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!habit) {
      throw new NotFoundException(`Habit with ID ${id} not found`);
    }
    return habit;
  }

  async updateHabit(
    userId: number,
    id: number,
    habitData: Partial<CreateHabitDto>,
  ): Promise<Habit> {
    const habit = await this.getById(userId, id);
    await this.habitsRepository.update(id, habitData);
    return this.getById(userId, id);
  }

  async deleteHabit(userId: number, id: number): Promise<void> {
    const result = await this.habitsRepository.delete({
      id,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Habit with ID ${id} not found`);
    }
  }
}
