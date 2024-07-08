import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @Column()
  emoji: string;

  @Column({
    type: 'enum',
    enum: ['morning', 'afternoon', 'evening'],
    default: 'morning',
  })
  time: 'morning' | 'afternoon' | 'evening';

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
  summary: number;

  @Column()
  left: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('simple-array')
  completedDays: string[];

  @ManyToOne(() => User, (user) => user.habits, { onDelete: 'SET NULL' })
  user: User;

  @Column({
    type: 'enum',
    enum: [false, true],
    default: true,
  })
  public: false | true;

  @Column({ type: 'simple-array' })
  relations: any[];
}
