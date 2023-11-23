import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerUserDto } from './dto/create-customer-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { ROLE } from '@prisma/client';
import { FilterCustomersDTO } from './dto/filter-customer.dto';
import { IsPublic } from 'src/auth/decorators/public.decorator';

@ApiTags('Customers')
@ApiBearerAuth('token')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly userService: UsersService,
  ) {}

  @IsPublic()
  @Post('')
  async create(@Body() createCustomerUser: CreateCustomerUserDto) {
    const { email, password, fullName, ...rest } = createCustomerUser;
    const user = await this.userService.create({
      name: fullName,
      email,
      password,
      type: 'CUSTOMER',
    });

    if (user) {
      return this.customersService.create({
        ...rest,
        fullName,
        userId: user.id,
        status: true,
      });
    }
  }

  // Routes for Customer
  @Roles(ROLE.CUSTOMER)
  @Get('profile')
  findCustomerProfile(@Request() req) {
    const userId = req.user.id;
    return this.customersService.findCustomerProfile(userId);
  }

  @Roles(ROLE.CUSTOMER)
  @Patch('update')
  updateByAccountId(
    @Request() req,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const userId = req.user.id;
    return this.customersService.updateCustomer(userId, updateCustomerDto);
  }

  // Routes for ADMIN
  @Get('')
  @Roles(ROLE.ADMIN)
  findAll(@Query() filters: FilterCustomersDTO) {
    return this.customersService.findAll(filters);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
