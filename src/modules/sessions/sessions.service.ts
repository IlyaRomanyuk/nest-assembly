import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  public async createNewSession(
    entityManager: EntityManager,
    createSessionDto: CreateSessionDto,
  ) {
    // Удаление старой сессии
    await entityManager.delete(Session, { userId: createSessionDto.userId });

    // Создание обновленной сессии
    return entityManager.save(this.sessionsRepository.create(createSessionDto));
  }

  async removeSessionsByUserId(userId: number) {
    return this.sessionsRepository.delete({ userId });
  }

  create(createSessionDto: CreateSessionDto) {
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
