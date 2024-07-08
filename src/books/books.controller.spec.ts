import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.schema';
import { CreateBookRequest, UpdateBookRequest } from './books.type';
import { BadRequestException } from '@nestjs/common';
import { isValidDate } from '../utils/date';
jest.mock('../utils/date', () => ({
  isValidDate: jest.fn(),
}));

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  describe('create', () => {
    it('should throw an error if title is missing', async () => {
      const createBookDto: CreateBookRequest = {
        title: '',
        author: 'Author',
        year: '01/01/2020',
        genre: 'Genre',
      };
      await expect(booksController.create(createBookDto)).rejects.toThrow(
        new BadRequestException('El título no puede estar vacío'),
      );
    });

    it('should throw an error if author is missing', async () => {
      const createBookDto: CreateBookRequest = {
        title: 'Title',
        author: '',
        year: '01/01/2020',
        genre: 'Genre',
      };
      await expect(booksController.create(createBookDto)).rejects.toThrow(
        new BadRequestException('El autor no puede estar vacío'),
      );
    });

    it('should throw an error if date format is invalid', async () => {
      const createBookDto: CreateBookRequest = {
        title: 'Title',
        author: 'Author',
        year: 'invalid-date',
        genre: 'Genre',
      };
      (isValidDate as jest.Mock).mockReturnValue(false);
      await expect(booksController.create(createBookDto)).rejects.toThrow(
        new BadRequestException(
          "Formato invalido de fecha, utilice: 'dd/mm/aaaa'",
        ),
      );
    });

    it('should create a book', async () => {
      const createBookDto: CreateBookRequest = {
        title: 'Title',
        author: 'Author',
        year: '01/01/2020',
        genre: 'Genre',
      };
      const book: Book = {
        title: 'Title',
        author: 'Author',
        year: '01/01/2020',
        genre: 'Genre',
      };
      (isValidDate as jest.Mock).mockReturnValue(true);
      jest.spyOn(booksService, 'create').mockResolvedValue(book);

      expect(await booksController.create(createBookDto)).toBe(book);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books: Book[] = [
        {
          title: 'Book 1',
          author: 'Author 1',
          year: '01/01/2020',
          genre: 'Genre 1',
        },
        {
          title: 'Book 2',
          author: 'Author 2',
          year: '01/01/2021',
          genre: 'Genre 2',
        },
      ];
      jest.spyOn(booksService, 'findAll').mockResolvedValue(books);

      expect(await booksController.findAll()).toBe(books);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const book: Book = {
        title: 'Book 1',
        author: 'Author 1',
        year: '01/01/2020',
        genre: 'Genre 1',
      };
      jest.spyOn(booksService, 'findOne').mockResolvedValue(book);

      expect(await booksController.findOne('1')).toBe(book);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookRequest = {
        title: 'Updated Title',
        author: 'Updated Author',
        year: '01/01/2021',
        genre: 'Updated Genre',
      };
      const book: Book = {
        title: 'Updated Title',
        author: 'Updated Author',
        year: '01/01/2021',
        genre: 'Updated Genre',
      };
      jest.spyOn(booksService, 'update').mockResolvedValue(book);
      jest.spyOn(booksService, 'findOne').mockResolvedValue(book);

      expect(await booksController.update('1', updateBookDto)).toBe(book);
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      const book: Book = {
        title: 'Book 1',
        author: 'Author 1',
        year: '01/01/2020',
        genre: 'Genre 1',
      };
      jest.spyOn(booksService, 'findOne').mockResolvedValue(book);

      expect(await booksController.delete('1')).toBe('Eliminado correctamente');
    });

    it('should return an error message if book does not exist', async () => {
      jest.spyOn(booksService, 'findOne').mockResolvedValue(null);

      expect(await booksController.delete('1')).toBe('El libro no existe');
    });
  });
});
