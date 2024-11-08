// books/controllers/book.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Book } from '../entities/book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('search')
  async search(@Query('title') title: string): Promise<Book[]> {
    return this.bookService.searchByTitle(title);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post()
  async create(@Body() book: Book): Promise<Book> {
    return this.bookService.create(book);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() book: Book): Promise<void> {
    await this.bookService.update(id, book);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.bookService.remove(id);
  }
}
