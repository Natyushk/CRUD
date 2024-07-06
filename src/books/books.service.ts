import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import { ObjectId } from 'mongodb';

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
  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(new ObjectId(id)).exec();
  }
  async update(id: string, bookDto: any): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, bookDto, { new: true }).exec();
  }
  async delete(id: string): Promise<Book> {
    return this.bookModel.findOneAndDelete(new ObjectId(id)).exec();
  }
}
