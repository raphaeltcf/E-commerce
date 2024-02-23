import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { RolesGuard } from './roles/guards/roles.guard';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { ItemOrderModule } from './modules/item-order/item-order.module';
import { EmailModule } from './modules/email/email.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { SalesReportModule } from './modules/sales-report/sales-report.module';
import { AwsModule } from './modules/aws/aws.module';

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
    TransactionsModule,
    SalesReportModule,
    AwsModule,
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
})
export class AppModule {}
