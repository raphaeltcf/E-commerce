import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './roles/guards/roles.guard';
import { CustomersModule } from './customers/customers.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ItemOrderModule } from './item-order/item-order.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    CustomersModule,
    ProductModule,
    OrderModule,
    ItemOrderModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
})
export class AppModule {}
