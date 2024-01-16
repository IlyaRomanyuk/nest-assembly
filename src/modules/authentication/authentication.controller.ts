import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthenticationGuard.guard';
import { JwtAuthGuard } from './guards/jwtAuthGuard.guard';
import { SessionsService } from '../sessions/sessions.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Get()
  findAll() {
    return this.authenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser) {
    const { user } = request;

    await this.sessionsService.removeSessionsByUserId(user.id);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;

    const userAuthData = await this.authenticationService.getAuthUserData(
      user.id,
    );

    const userData = await this.authenticationService.getUserData(user.id);

    return {
      id: user.id,
      email: user.email,
      ...userData,
      ...userAuthData,
    };
  }

  @HttpCode(201)
  @Post('register')
  async create(@Body() registerData: RegisterDto) {
    return await this.authenticationService.register(registerData);
  }
}
