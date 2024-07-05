import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class authDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name?: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username for authentication',
  })
  username: string;

  @ApiProperty({
    example: 'secretpassword',
    description: 'Password for authentication',
  })
  password: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 15, description: 'User Age' })
  @IsNumber()
  age?: number;
}

export class VerificationDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email for verification',
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'Verification code' })
  code: string;
}

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'Username for login' })
  username: string;

  @ApiProperty({ example: 'secretpassword', description: 'Password for login' })
  password: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secretpassword', description: 'User password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username for authentication',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}
