import { Habit } from 'src/habits/entities/habit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Habit, (habit) => habit.user)
  habits: Habit[];
}
