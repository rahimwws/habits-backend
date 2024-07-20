import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Habit } from 'src/habits/entities/habit.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
  ) {}

  getInfo(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async uploadAvatar(
    file: Express.Multer.File,
    username: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    user.avatar = file.buffer;
    await this.usersRepository.save(user);
    return user;
  }

  changeName(username: string, newName: string) {
    this.usersRepository.update({ username }, { name: newName });
    return { message: 'Name was successfully changed' };
  }

  async changePassword(
    username: string,
    newPassword: string,
    oldPassword: string,
  ) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (isPasswordValid) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.usersRepository.save(user);
        return { message: 'Password was successfully changed' };
      } else {
        return { message: 'Old password is incorrect' };
      }
    } else {
      throw new NotFoundException(`User with UserName ${username} not found`);
    }
  }
  changeAge(username: string, age: number) {
    this.usersRepository.update({ username }, { age });
    return { message: 'Age was successfully changed' };
  }
  async getHabits(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      const habits = await this.habitsRepository.find({
        where: { user: { id: user.id } },
      });
      if (habits.length === 0) {
        return { message: 'Habits is empty' };
      } else {
        return habits;
      }
    } else {
      return { message: 'User not found' };
    }
  }
}
