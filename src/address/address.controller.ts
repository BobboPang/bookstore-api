import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { FindAddressDto } from './dto/find-address.dto';

@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuardUser)
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressService.create(createAddressDto);
  }

  // 列表
  @UseGuards(JwtAuthGuardUser)
  @Get()
  async findAll(@Query() query: FindAddressDto): Promise<Address> {
    return await this.addressService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.addressService.findOne(+id);
  // }

  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }
  @UseGuards(JwtAuthGuardUser)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
