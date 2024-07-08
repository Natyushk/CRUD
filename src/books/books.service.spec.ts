import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { Book, BookDocument } from './book.schema';
import { NotFoundException } from '@nestjs/common';

const mockBook = {
  title: 'Test Book',
  author: 'Test Author',
  year: '2024',
  genre: 'Test Genre',
};

const accountIdString = '668b2c00916f6f81cd61f75e';

const mockBookModel = {
  new: jest.fn().mockResolvedValue(mockBook),
  constructor: jest.fn().mockResolvedValue(mockBook),
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  exec: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockBook as any);
    const book = await service.create(mockBook);
    expect(book).toEqual(mockBook);
  });

  it('should find all books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockBook]),
    } as any);
    const books = await service.findAll();
    expect(books).toEqual([mockBook]);
  });

  it('should find a book by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);
    const book = await service.findOne(accountIdString);
    expect(book).toEqual(mockBook);
  });

  it('should throw an error when book not found', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    await expect(service.findOne(accountIdString)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a book', async () => {
    const updatedBook = { ...mockBook, title: 'Updated Title' };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(updatedBook),
    } as any);
    const book = await service.update(accountIdString, updatedBook);
    expect(book).toEqual(updatedBook);
  });

  it('should throw an error when updating book not found', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    await expect(service.update(accountIdString, mockBook)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a book', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);
    const book = await service.delete(accountIdString);
    expect(book).toEqual(mockBook);
  });

  it('should throw an error when deleting book not found', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    await expect(service.delete(accountIdString)).rejects.toThrow(
      NotFoundException,
    );
  });
});
