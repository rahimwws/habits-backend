import { Habit } from 'src/habits/entities/habit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Habit, (habit) => habit.user, { onDelete: 'SET NULL' })
  habits: Habit[];

  @Column({
    type: 'simple-array',
    default: [],
  })
  friends: string[] = [];

  @Column({
    type: 'simple-array',
    default: [],
  })
  awards: string[] = [];
}
