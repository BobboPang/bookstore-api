import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { Book } from './entities/book.entity';
import { FindBookDto } from './dto/find-book.dto';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(@Query() query: FindBookDto): Promise<Book> {
    return await this.booksService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.booksService.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
