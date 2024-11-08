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

  /**
   * Retorna uma lista de todos os livros.
   * @returns {Promise<Book[]>} Lista de livros.
   */
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  /**
   * Retorna um livro específico pelo ID.
   * @param {number} id - ID do livro a ser encontrado.
   * @returns {Promise<Book>} Livro encontrado.
   */
  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  /**
   * Cria um novo livro.
   * @param {Book} book - Dados do livro a ser criado.
   * @returns {Promise<Book>} Livro criado.
   */
  async create(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  /**
   * Atualiza um livro existente.
   * @param {number} id - ID do livro a ser atualizado.
   * @param {Book} book - Dados do livro atualizados.
   * @returns {Promise<void>}
   */
  async update(id: number, book: Book): Promise<void> {
    await this.bookRepository.update(id, book);
  }

  /**
   * Remove um livro pelo ID.
   * @param {number} id - ID do livro a ser removido.
   * @returns {Promise<void>}
   */
  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  /**
   * Busca livros pelo título.
   * @param {string} title - Título do livro a ser buscado.
   * @returns {Promise<Book[]>} Lista de livros correspondentes ao título fornecido.
   */
  async searchByTitle(title: string): Promise<Book[]> {
    return this.bookRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });
  }
}
