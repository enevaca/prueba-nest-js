import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { BooksService } from './books.service';
import { BookDto } from '../domain/dto/book.dto';
import { BookEntity } from '../domain/model/book.entity';

@ApiTags('book')
@Controller('books')
@ApiBearerAuth('access-token')
export class BooksController {
  constructor(private booksService: BooksService) {}

  /**
   *
   * @returns {Book[]} Devuelve una lista de libros
   * @param {Request} request Lista de parámetros para filtrar
   */
  @Get()
  @ApiOperation({ summary: 'Obtener lista de libros' })
  @ApiResponse({
    status: 201,
    description: 'Lista de libros',
    type: BookEntity,
  })
  findAll(@Req() request: Request): Promise<BookEntity[]> {
    console.log(request.query);
    return this.booksService.findAll(request.query);
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string): Promise<BookEntity> {
    return this.booksService.findBook(bookId);
  }

  @Post()
  createBook(@Body() newBook: BookDto): Promise<BookEntity> {
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string): Promise<BookEntity> {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  updateBook(
    @Param('bookId') bookId: string,
    @Body() newBook: BookDto,
  ): Promise<BookEntity> {
    return this.booksService.updateBook(bookId, newBook);
  }
}
