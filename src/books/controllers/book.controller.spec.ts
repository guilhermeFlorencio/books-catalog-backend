import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from '../services/book.service';
import { Book } from '../entities/book.entity';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation((id: number) =>
      Promise.resolve({
        id,
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        publishDate: new Date(),
      }),
    ),
    create: jest
      .fn()
      .mockImplementation((book: Book) => Promise.resolve({ id: 1, ...book })),
    update: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    searchByTitle: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of books', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single book', async () => {
    const id = 1;
    await expect(controller.findOne(id)).resolves.toEqual({
      id,
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      publishDate: expect.any(Date),
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should create a new book', async () => {
    const book: Book = {
      id: undefined,
      title: 'New Book',
      author: 'New Author',
      description: 'New Description',
      publishDate: new Date('2023-01-01'),
    };
    await expect(controller.create(book)).resolves.toEqual({
      id: 1,
      ...book,
    });
    expect(service.create).toHaveBeenCalledWith(book);
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
    await expect(controller.update(id, book)).resolves.toBeUndefined();
    expect(service.update).toHaveBeenCalledWith(id, book);
  });

  it('should remove a book', async () => {
    const id = 1;
    await expect(controller.remove(id)).resolves.toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
