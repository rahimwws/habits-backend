import {
  IsNotEmpty,
  IsBoolean,
  IsIn,
  IsInt,
  Min,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(['doing', 'success', 'failed'])
  @IsOptional()
  status?: 'doing' | 'success' | 'failed';

  @IsEnum(['counter', 'default', 'timer'])
  @IsNotEmpty()
  type: 'counter' | 'default' | 'timer';

  @IsInt()
  @IsNotEmpty()
  summary: number;

  @IsInt()
  @IsNotEmpty()
  left: number;
}
