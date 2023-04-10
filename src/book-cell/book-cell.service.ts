import { Injectable } from '@nestjs/common';
import { CreateBookCellDto } from './dto/create-book-cell.dto';
import { UpdateBookCellDto } from './dto/update-book-cell.dto';

@Injectable()
export class BookCellService {
  create(createBookCellDto: CreateBookCellDto) {
    return 'This action adds a new bookCell';
  }

  findAll() {
    return `This action returns all bookCell`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookCell`;
  }

  update(id: number, updateBookCellDto: UpdateBookCellDto) {
    return `This action updates a #${id} bookCell`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookCell`;
  }
}
