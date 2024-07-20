import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export interface completeDays {
  date: string;
  status: 'success' | 'failed' | 'doing';
}
@Entity()
export class Habit {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @Column()
  emoji: string;

  @Column()
  time: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: ['doing', 'success', 'failed'],
    default: 'doing',
  })
  status: 'doing' | 'success' | 'failed';

  @Column({
    type: 'enum',
    enum: ['counter', 'default', 'timer'],
    default: 'default',
  })
  type: 'counter' | 'default' | 'timer';

  @Column()
  total: number;

  @Column()
  remain: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('simple-json')
  completedDays: completeDays[];

  @ManyToOne(() => User, (user) => user.habits, { onDelete: 'SET NULL' })
  user: User;

  @Column({
    type: 'boolean',
    default: false,
  })
  public: false | true;

  @Column({ type: 'simple-array' })
  relations: any[];

  @Column()
  color: string;
}
// {
//   name: "Daily Reading",
//   status: "Success",
//   remain: 10,
//   total: 10,
//   type: "counter",
//   emoji: "📚",
//   descriptions: "Reading is the key to knowledge and growth.",
//   friends: [{ name: "", avatar: "" }],
//   startDate: new Date("2024-06-14"),
//   endDate: new Date("2024-06-30"),
//   time: "9:42",
//   color: colors.yellow,
// }
