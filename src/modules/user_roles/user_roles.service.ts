import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRole } from './entities/user_role.entity';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>,
  ) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesRepository.create(createUserRoleDto);
  }

  getUserRolesByUserId(userId: number) {
    return this.userRolesRepository
      .createQueryBuilder()
      .where({ userId })
      .getMany();
  }

  findAll() {
    return `This action returns all userRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }
}
