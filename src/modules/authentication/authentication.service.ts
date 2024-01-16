import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { uuid } from 'uuidv4';

import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { RegisterDto } from './dto/register.dto';
import { PostgresErrorCode } from '../../database/errors/postgresErrorCode';
import { UsersService } from '../users/users.service';
import { config } from '../../config';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { UserRolesService } from '../user_roles/user_roles.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRolesService: UserRolesService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}
  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }

  public async getAuthenticatedUser(email: string, plainPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        'WRONG_CREDENTIALS_PROVIDED',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getUserData(userId: number) {
    const userRoles = await this.userRolesService.getUserRolesByUserId(userId);

    const roleIds = userRoles.map((element) => element.roleId);
    const rolesData = await this.rolesService.findAllByRolesId(roleIds);
    const roles = rolesData.map((element) => element.role);

    return { roles };
  }

  public async getAccessToken(userId: number) {
    const userData = await this.getUserData(userId);
    const payload: TokenPayload = {
      userId,
      ...userData,
    };
    return this.jwtService.sign(payload, {
      secret: config.keys.jwtAccessTokenSecret,
      expiresIn: config.keys.jwtAccessTokenExpirationTime,
    });
  }

  public async getAuthUserData(userId: number) {
    const accessToken = await this.getAccessToken(userId);
    const refreshToken = uuid();
    await this.usersService.setCurrentRefreshToken(refreshToken, userId);

    return { accessToken, refreshToken };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compareSync(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'WRONG_CREDENTIALS_PROVIDED',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async register(registrationData: RegisterDto) {
    try {
      return await this.usersService.create(registrationData);
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'SOMETHING_WENT_WRONG',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
