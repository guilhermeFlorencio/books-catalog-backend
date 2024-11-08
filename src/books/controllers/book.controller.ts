import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Book } from '../entities/book.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os livros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os livros retornada com sucesso.',
  })
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar livros pelo título' })
  @ApiQuery({
    name: 'title',
    type: String,
    description: 'Título do livro a ser buscado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de livros correspondente ao título fornecido.',
  })
  async search(@Query('title') title: string): Promise<Book[]> {
    return this.bookService.searchByTitle(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um livro pelo ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do livro a ser obtido',
  })
  @ApiResponse({ status: 200, description: 'Livro encontrado.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo livro' })
  @ApiBody({ type: Book, description: 'Dados do livro a ser criado' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso.' })
  async create(@Body() book: Book): Promise<Book> {
    return this.bookService.create(book);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um livro pelo ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do livro a ser atualizado',
  })
  @ApiBody({ type: Book, description: 'Dados do livro atualizados' })
  @ApiResponse({ status: 204, description: 'Livro atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async update(@Param('id') id: number, @Body() book: Book): Promise<void> {
    await this.bookService.update(id, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um livro pelo ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do livro a ser removido',
  })
  @ApiResponse({ status: 204, description: 'Livro removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.bookService.remove(id);
  }
}
