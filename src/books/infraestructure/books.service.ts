import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDto } from '../domain/dto/book.dto';
import { BookEntity } from '../domain/model/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRespository: Repository<BookEntity>,
  ) {}

  async findAll(params): Promise<BookEntity[]> {
    return await this.booksRespository.find();
  }

  async findBook(bookId: string): Promise<BookEntity> {
    return await this.booksRespository.findOne({ where: { id: bookId } });
  }

  createBook(newBook: BookDto): Promise<BookEntity> {
    return this.booksRespository.save(newBook);
  }

  deleteBook(bookId: string): Promise<any> {
    return this.booksRespository.delete({ id: parseInt(bookId) });
  }

  async updateBook(bookId: string, newBook: BookDto): Promise<BookEntity> {
    const toUpdate = await this.booksRespository.findOne(bookId);
    const updated = Object.assign(toUpdate, newBook);
    return this.booksRespository.save(updated);
  }
}
