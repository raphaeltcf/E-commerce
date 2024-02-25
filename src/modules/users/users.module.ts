import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { EmailService } from 'src/modules/email/email.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, EmailService],
  exports: [UsersService],
})
export class UsersModule {}
