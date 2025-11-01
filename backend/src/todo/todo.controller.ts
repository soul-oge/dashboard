/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller("todo")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get("/all")
    getATodo(){
        return this.todoService.getAllTodo()
    }

    @Post('/create')
    createUser(@Body() data: CreateTodoDto) {
    return this.todoService.createTodo(data);
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() data: UpdateTodoDto) {
    return this.todoService.updateTodo(id, data);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
    }
}
