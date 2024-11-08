import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';

describe('BookService', () => {
  let service: BookService;
  let repository: Repository<Book>;

  const mockRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation((criteria) =>
      Promise.resolve({
        id: criteria.where.id,
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        publishDate: new Date(),
      }),
    ),
    save: jest
      .fn()
      .mockImplementation((book) => Promise.resolve({ id: 1, ...book })),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of books', async () => {
    await expect(service.findAll()).resolves.toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single book', async () => {
    const id = 1;
    await expect(service.findOne(id)).resolves.toEqual({
      id,
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      publishDate: expect.any(Date),
    });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should create a new book', async () => {
    const book: Book = {
      id: undefined,
      title: 'New Book',
      author: 'New Author',
      description: 'New Description',
      publishDate: new Date('2023-01-01'),
    };
    await expect(service.create(book)).resolves.toEqual({
      id: 1,
      ...book,
    });
    expect(repository.save).toHaveBeenCalledWith(book);
  });

  it('should update a book', async () => {
    const id = 1;
    const book: Book = {
      id,
      title: 'Updated Book',
      author: 'Updated Author',
      description: 'Updated Description',
      publishDate: new Date('2023-01-01'),
    };
    await expect(service.update(id, book)).resolves.toBeUndefined();
    expect(repository.update).toHaveBeenCalledWith(id, book);
  });

  it('should remove a book', async () => {
    const id = 1;
    await expect(service.remove(id)).resolves.toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('should search books by title', async () => {
    const title = 'Test Title';
    mockRepository.find.mockResolvedValueOnce([
      {
        id: 1,
        title,
        author: 'Test Author',
        description: 'Test Description',
        publishDate: new Date(),
      },
    ]);
    await expect(service.searchByTitle(title)).resolves.toEqual([
      {
        id: 1,
        title,
        author: 'Test Author',
        description: 'Test Description',
        publishDate: expect.any(Date),
      },
    ]);
    expect(repository.find).toHaveBeenCalledWith({
      where: { title: expect.stringContaining(title) },
    });
  });
});
