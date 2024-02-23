import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/modules/email/email.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EmailService],
  exports: [UsersService],
})
export class UsersModule {}
