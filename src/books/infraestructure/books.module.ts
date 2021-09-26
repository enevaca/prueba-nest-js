import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookEntity } from '../domain/model/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
