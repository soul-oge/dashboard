import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  status?: 'UNCOMPLETED' | 'COMPLETED' | 'INPROGRESS';
}
