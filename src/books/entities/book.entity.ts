import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  score: number;

  @Column()
  description: string;
}
