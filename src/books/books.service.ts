import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async create(bookDto: any): Promise<Book> {
    const createdBook = new this.bookModel(bookDto);
    return createdBook.save();
  }
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
