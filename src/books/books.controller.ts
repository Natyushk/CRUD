import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: any) {
    return this.booksService.create(createBookDto);
  }
  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }
}
 