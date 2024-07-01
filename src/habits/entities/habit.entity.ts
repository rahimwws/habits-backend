import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

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

  @ManyToOne(() => User, (user) => user.habits)
  user: User;
}
