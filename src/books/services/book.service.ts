import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async create(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async update(id: number, book: Book): Promise<void> {
    await this.bookRepository.update(id, book);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async searchByTitle(title: string): Promise<Book[]> {
    return this.bookRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });
  }
}
