import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { User } from 'src/user/entities/user.entity';
import { EditHabit } from './edit/edit.service';
import { RelationsService } from './relations/relations.service';
import { Requests } from 'src/requests/entities/requests.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habit]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Requests]),
  ],
  controllers: [HabitsController],
  providers: [HabitsService, EditHabit, RelationsService],
})
export class HabitsModule {}
