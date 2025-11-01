import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'yagami@gmail.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'Yagami',
  })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiPropertyOptional({
    description: 'Password (minimum 6 characters)',
    example: 'password123',
  })
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string | null;

  @IsOptional()
  provider?: string;

  @IsOptional()
  status?: 'USER' | 'ADMIN';
}
