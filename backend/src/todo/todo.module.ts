import { PrismaService } from 'src/prisma.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
        TodoController, ],
  providers: [
        TodoService, PrismaService],
})
export class TodoModule {}
