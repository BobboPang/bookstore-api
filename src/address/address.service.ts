import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<any> {
    const { address, userId } = createAddressDto;
    console.log(createAddressDto);
    delete createAddressDto.id;
    const isExist = await this.addressRepository.count({
      where: {
        address,
        userId,
      },
    });
    console.log(isExist);
    if (isExist > 0) {
      return {
        statusCode: 202,
        message: '该地址已存在',
      };
    }

    return await this.addressRepository.save(createAddressDto);
  }

  // 列表
  async findAll(query: any): Promise<any> {
    const { keyword, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    };

    let whereParams = {};

    if (keyword) {
      whereParams = Object.assign(whereParams, {
        userId: Like(`%${keyword}%`),
      });
    }

    params = Object.assign(
      {
        select: ['id','userId', 'receiveName', 'phone', 'address'],
      },
      params,
      {
        where: whereParams,
      },
      {
        order: {
          id: 'DESC',
        },
      },
    );

    const [data, total] = await this.addressRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(
    userId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<any> {
    const isExist = await this.addressRepository.count({
      where: {
        userId,
      },
    });
    if (isExist > 1) {
      return {
        statusCode: 201,
        message: '已存在',
      };
    }

    return await this.addressRepository.update(userId, updateAddressDto);
  }
  remove(id: number) {
    return this.addressRepository.delete(id);
  }
}
