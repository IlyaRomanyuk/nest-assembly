import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RegisterDto } from '../authentication/dto/register.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { UserRolesService } from '../user_roles/user_roles.service';
import { EnumRoleIds } from '../roles/enums/role.enum';
import { SessionsService } from '../sessions/sessions.service';
import { config } from '../../config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private profilesService: ProfilesService,
    private userRolesService: UserRolesService,
    private sessionsService: SessionsService,
  ) {}

  async create(userDataRegistration: RegisterDto) {
    const user = await this.usersRepository.findOne({
      where: { email: userDataRegistration.email },
    });

    if (user) {
      throw new HttpException('LOGIN_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    return this.usersRepository.manager.transaction(
      async (transactionEntityManager) => {
        const userData = await transactionEntityManager.save(
          this.usersRepository.create({
            email: userDataRegistration.email,
            login: userDataRegistration.email,
            password: userDataRegistration.password,
          }),
        );

        const profileData = await transactionEntityManager.save(
          this.profilesService.create({
            email: userDataRegistration.email,
            firstName: userDataRegistration.firstName,
            lastName: userDataRegistration.lastName,
          }),
        );

        await transactionEntityManager.save(
          this.userRolesService.create({
            userId: userData.id,
            profileId: profileData.id,
            roleId: EnumRoleIds.PATIENT,
          }),
        );
      },
    );
  }

  setCurrentRefreshToken(refreshToken: string, userId: number) {
    return this.usersRepository.manager.transaction(
      async (transactionEntityManager) => {
        const dateNow = Date.now();

        await this.sessionsService.createNewSession(transactionEntityManager, {
          refreshToken,
          userId,
          expiresIn:
            dateNow + Number(config.keys.jwtRefreshTokenExpirationTime || 0),
        });
      },
    );
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['userRoles'],
    });
    if (!user) {
      throw new HttpException('USER_NOT_EXISTS', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getById(id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('u')
      .where({ id })
      .leftJoinAndSelect('u.sessions', 'sessions')
      .leftJoinAndSelect('u.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .getOne();

    if (!user) {
      throw new HttpException('USER_NOT_EXISTS', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
