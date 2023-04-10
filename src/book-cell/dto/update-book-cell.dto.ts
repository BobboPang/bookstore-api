import { PartialType } from '@nestjs/mapped-types';
import { CreateBookCellDto } from './create-book-cell.dto';

export class UpdateBookCellDto extends PartialType(CreateBookCellDto) {}
