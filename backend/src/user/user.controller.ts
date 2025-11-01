import type { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { LoginUser } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/register')
  async register(@Body() data: CreateUserDto) {
    await this.userService.register(data);
    return { message: 'Utilisateur créé avec succès' };
  }

  @Post('/signin')
  async signin(
    @Body() data: LoginUser,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.userService.getUserByEmail(data.email);
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(data.password, user.password))
    ) {
      throw new BadRequestException('Email ou mot de passe invalide');
    }

    session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      status: user.status,
      isLoggedIn: true,
    };

    return { message: 'Connexion réussie', user: session.user };
  }

  @Get('/me')
  getProfile(@Session() session: Record<string, any>) {
    if (!session.user || !session.user.isLoggedIn) {
      throw new UnauthorizedException('Utilisateur non connecté');
    }
    return session.user;
  }

  @Get('/logout')
  async logout(@Session() session: Record<string, any>, @Res() res: Response) {
    if (!session.user) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    return new Promise<void>((resolve) => {
      session.destroy((err) => {
        if (err) {
          console.error('Erreur destruction session:', err);
          res.status(500).json({ message: 'Erreur lors de la déconnexion' });
          resolve();
          return;
        }

        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Déconnexion réussie' });
        resolve();
      });
    });
  }

  @Post('/update-profile')
  async updateProfile(
    @Body() data: UpdateUser,
    @Session() session: Record<string, any>,
  ) {
    if (!session.user || !session.user.isLoggedIn) {
      throw new UnauthorizedException('Veuillez vous connecter.');
    }

    const userId = session.user.id;

    const updateData: Partial<UpdateUser> = {};

    if (data.username && typeof data.username === 'string') {
      updateData.username = data.username.trim();
    }

    if (data.email && typeof data.email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new BadRequestException('Email invalide');
      }
      updateData.email = data.email.trim();
    }

    if (
      data.password &&
      typeof data.password === 'string' &&
      data.password.trim() !== ''
    ) {
      if (data.password.length < 6) {
        throw new BadRequestException(
          'Le mot de passe doit contenir au moins 6 caractères.',
        );
      }
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await this.userService.updateUser(userId, updateData);

    if (updateData.username) session.user.username = updateData.username;
    if (updateData.email) session.user.email = updateData.email;

    return { message: 'Profil mis à jour avec succès' };
  }

  @Post('/create')
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUser) {
    return this.userService.updateUser(id, data);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
