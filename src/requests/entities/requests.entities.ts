import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Requests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: ['friendship', 'default'],
    default: 'friendship',
  })
  category: 'friendship' | 'default';

  @Column('simple-array')
  requests: string[];
}
