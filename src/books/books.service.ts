import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<any> {
    const { name } = createBookDto;
    console.log(createBookDto);
    delete createBookDto.id;
    const isExist = await this.booksRepository.count({
      where: {
        name,
      },
    });
    console.log(isExist);
    if (isExist > 0) {
      return {
        statusCode: 202,
        message: '该书名已存在',
      };
    }

    return await this.booksRepository.save(createBookDto);
  }

  // 列表
  async findAll(query: any): Promise<any> {
    const { keyword, category, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    };

    let whereParams = {};

    if (keyword) {
      whereParams = Object.assign(whereParams, {
        name: Like(`%${keyword}%`),
      });
    }

    if (category) {
      whereParams = Object.assign(whereParams, {
        category,
      });
    }

    params = Object.assign(
      params,
      {
        where: whereParams,
      },
      {
        order: {
          name: 'DESC',
        },
      },
    );

    const [data, total] = await this.booksRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  // 根据ID查找
  async findOneById(id: string): Promise<any> {
    return this.booksRepository.createQueryBuilder().where({ id }).getOne();
  }

  // 数量
  async getCount() {
    return await this.booksRepository.count();
  }
  // 更新
  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.booksRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
