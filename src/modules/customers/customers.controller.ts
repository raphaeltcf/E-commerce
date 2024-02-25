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
import { UpdateCustomerDto } from './interfaces/dto/update-customer.dto';
import { CreateCustomerUserDto } from './interfaces/dto/create-customer-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ROLE } from '@prisma/client';
import { FilterCustomersDTO } from './interfaces/dto/filter-customer.dto';
import { IsPublic } from 'src/core/decorators/public.decorator';

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

  @Roles(ROLE.CUSTOMER)
  @Get('profile')
  async findCustomerProfile(@Request() req) {
    const userId = req.user.id;
    return await this.customersService.findCustomerProfile(userId);
  }

  @Roles(ROLE.CUSTOMER)
  @Patch('update')
  async updateByAccountId(
    @Request() req,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const userId = req.user.id;
    return await this.customersService.updateCustomer(
      userId,
      updateCustomerDto,
    );
  }

  // Routes for ADMIN
  @Get('')
  @Roles(ROLE.ADMIN)
  async findAll(@Query() filters: FilterCustomersDTO) {
    return await this.customersService.findAll(filters);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  async findOne(@Param('id') id: string) {
    return await this.customersService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.customersService.remove(id);
  }
}
