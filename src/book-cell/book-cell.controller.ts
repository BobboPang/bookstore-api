import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookCellService } from './book-cell.service';
import { CreateBookCellDto } from './dto/create-book-cell.dto';
import { UpdateBookCellDto } from './dto/update-book-cell.dto';

@Controller('book-cell')
export class BookCellController {
  constructor(private readonly bookCellService: BookCellService) {}

  @Post()
  create(@Body() createBookCellDto: CreateBookCellDto) {
    return this.bookCellService.create(createBookCellDto);
  }

  @Get()
  findAll() {
    return this.bookCellService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCellService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookCellDto: UpdateBookCellDto) {
    return this.bookCellService.update(+id, updateBookCellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookCellService.remove(+id);
  }
}
