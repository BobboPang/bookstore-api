import { Module } from '@nestjs/common';
import { BookCellService } from './book-cell.service';
import { BookCellController } from './book-cell.controller';

@Module({
  controllers: [BookCellController],
  providers: [BookCellService]
})
export class BookCellModule {}
