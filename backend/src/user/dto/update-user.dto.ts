import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUser {
  @ApiPropertyOptional({
    description: 'The username of the user',
    example: 'Yagami',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  username?: string;

  @ApiPropertyOptional({
    description: 'The email ya the user',
    example: 'yagami@gmail.com',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @ApiPropertyOptional({
    description: 'The new password for the user (6 to 20 characters)',
    example: 'password',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters',
  })
  password?: string | null;

  @IsOptional()
  provider?: string;

  @IsOptional()
  status?: 'USER' | 'ADMIN';
}
