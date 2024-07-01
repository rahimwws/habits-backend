import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { User } from 'src/user/entities/user.entity';
import { EditHabit } from './edit/edit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habit]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [HabitsController],
  providers: [HabitsService, EditHabit],
})
export class HabitsModule {}
