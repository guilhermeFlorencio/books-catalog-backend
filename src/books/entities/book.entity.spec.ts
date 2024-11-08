import { Book } from './book.entity';

describe('Book Entity', () => {
  it('should be defined', () => {
    expect(new Book()).toBeDefined();
  });

  it('should have default properties', () => {
    const book = new Book();
    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('author');
    expect(book).toHaveProperty('description');
    expect(book).toHaveProperty('publishDate');
  });

  it('should allow setting properties through constructor', () => {
    const book = new Book();
    book.title = 'Test Title';
    book.author = 'Test Author';
    book.description = 'Test Description';
    book.publishDate = new Date('2023-01-01');

    expect(book.title).toBe('Test Title');
    expect(book.author).toBe('Test Author');
    expect(book.description).toBe('Test Description');
    expect(book.publishDate.toISOString()).toBe(
      new Date('2023-01-01').toISOString(),
    );
  });
});
