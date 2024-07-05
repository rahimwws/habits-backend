import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Habit } from '../entities/habit.entity';
import { User } from 'src/user/entities/user.entity';
import { Requests } from 'src/requests/entities/requests.entities';

@Injectable()
export class RelationsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Requests)
    private requestsRepository: Repository<Requests>,
  ) {}

  async getFriends(id: number) {
    const habit = await this.habitsRepository.findOne({
      where: { user: { id } },
    });
    if (!habit) {
      throw new NotFoundException(`Habit for User with ID ${id} not found`);
    }

    if (habit.relations && habit.relations.length > 0) {
      const userIds = habit.relations;
      const users = await this.userRepository.find({
        where: { id: In(userIds) },
      });
      return users;
    } else {
      return { message: "You don't have friends for this Habit" };
    }
  }

  async addFriend(habitId: number, username: string) {
    const habit = await this.habitsRepository.findOne({
      where: { id: habitId },
    });
    if (!habit) {
      throw new NotFoundException(`Habit with ID ${habitId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with Username ${username} not found`);
    }

    if (habit.relations && habit.relations.includes(user.id)) {
      return { message: 'Friend already added' };
    } else {
      habit.relations = [...habit.relations, user.id];
      await this.habitsRepository.save(habit);
      return { message: 'Friend added successfully' };
    }
  }

  async friendsHabit(username: string, habitId: number) {
    const habit = await this.habitsRepository.findOne({
      where: { id: habitId },
    });
    if (!habit) {
      throw new NotFoundException(`Habit with ID ${habitId} not found`);
    }
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with Username ${username} not found`);
    }
    if (habit.relations.includes(String(user.id))) {
      return { message: 'This friend exist on your habit' };
    } else {
      throw new NotFoundException(
        `User with Username ${username} not found in ${habit.name} habit`,
      );
    }
  }

  async removeFriend(username: string, habitId: number, friend: string) {
    const habit = await this.habitsRepository.findOne({
      where: { id: habitId, user: { username: username } },
    });
    if (!habit) {
      throw new NotFoundException(`Habit with ID ${habitId} not found`);
    }
    const user = await this.userRepository.findOne({
      where: { username: friend },
    });
    if (!user) {
      throw new NotFoundException(`User with Username ${friend} not found`);
    }
    if (habit.relations && habit.relations.includes(String(user.id))) {
      habit.relations = habit.relations.filter(
        (id) => String(id) !== String(user.id),
      );
      await this.habitsRepository.save(habit);
      return { message: 'Friend removed successfully' };
    } else {
      return { message: 'Friend not found on your habit' };
    }
  }
}
