/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService){}

    async getAllTodo(){
        return this.prisma.todo.findMany();
    }

    async getTodoById(id: string) {
        const todo = this.prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new Error('Task not found');
        }
        return todo;
    }

    async createTodo(data: CreateTodoDto) {
        const todoExist = await this.prisma.todo.findUnique({
          where: { name: data.name },
        });
        if (todoExist) {
          throw new BadRequestException('Todo already exists');
        }
        return this.prisma.todo.create({ data });
    }

    async updateTodo(id: string, data: UpdateTodoDto) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return this.prisma.todo.update({ where: { id }, data });
    }

    async deleteTodo(id: string) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return this.prisma.todo.delete({ where: { id } });
    }
}
