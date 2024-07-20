import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { completeDays } from '../entities/habit.entity';

export class CreateHabitDto {
  @ApiProperty({
    example: 'Morning Exercise',
    description: 'The name of the habit',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '🧘‍♀️',
    description: 'Emoji of the habit',
  })
  @IsString()
  @IsNotEmpty()
  emoji: string;

  @ApiProperty({
    example: 'morning',
    enum: ['afternoon', 'morning', 'evening'],
    description: 'Time of the habit',
  })
  @IsEnum(['morning', 'afternoon', 'evening'])
  @IsNotEmpty()
  time: 'morning' | 'afternoon' | 'evening';

  @ApiProperty({
    example: '15-minute exercise routine',
    description: 'Description of the habit',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Fitness', description: 'Category of the habit' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 'doing',
    enum: ['doing', 'success', 'failed'],
    required: false,
    description: 'Status of the habit',
  })
  @IsEnum(['doing', 'success', 'failed'])
  @IsOptional()
  status?: 'doing' | 'success' | 'failed';

  @ApiProperty({
    example: 'timer',
    enum: ['counter', 'default', 'timer'],
    description: 'Type of the habit',
  })
  @IsEnum(['counter', 'default', 'timer'])
  @IsNotEmpty()
  type: 'counter' | 'default' | 'timer';

  @ApiProperty({ example: 15, description: 'Summary or target for the habit' })
  @IsInt()
  @IsNotEmpty()
  summary: number;

  @ApiProperty({
    example: 15,
    description: 'Count of how many times left for habit',
  })
  @IsInt()
  @IsNotEmpty()
  left: number;

  @ApiProperty({
    example: '2024-07-01',
    description: 'Start date of the habit',
  })
  @IsString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: '2024-07-21', description: 'End date of the habit' })
  @IsString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    example: [{ date: '2024-07-01', status: 'success' }],
    isArray: true,
    required: false,
    description: 'List of completed days',
  })
  @IsArray()
  @IsOptional()
  completedDays?: completeDays[] = [];

  @ApiProperty({
    example: true,
    enum: [false, true],
    description: 'Type of the privity of HabitD',
  })
  @IsEnum([false, true])
  @IsNotEmpty()
  public: boolean = false;

  @ApiProperty({
    example: [],
    isArray: true,
    required: false,
    description: 'List of friends for this Habit',
  })
  @IsArray()
  @IsOptional()
  relations?: number[] = [];

  @ApiProperty({
    example: 'yellow',
    description: 'Color of the habit',
  })
  @IsString()
  @IsOptional()
  color: string;
}
