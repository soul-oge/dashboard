import { Controller, Get, Req, Res, UseGuards, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    //Auth
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    const googleUser = req.user as { email: string; username: string; provider: string };

    if (!googleUser || !googleUser.email) {
      return res.redirect('http://localhost:3000/login?error=google');
    }

    let user;
    try {
      user = await this.userService.getUserByEmail(googleUser.email);
    } catch (error) {
      console.log(error);
      user = await this.userService.register({
        email: googleUser.email,
        username: googleUser.username || googleUser.email.split('@')[0],
        password: undefined,
        provider: 'google',
        status: 'USER',
      });
    }

    session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      status: user.status,
      isLoggedIn: true,
    };

    console.log('Session enregistrée:', session.user);

    return res.redirect('http://localhost:3000');
  }
}
