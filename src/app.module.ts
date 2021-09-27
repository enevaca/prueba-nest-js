import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/infraestructure/books.module';
//import { configService } from './config/config.service';
//import { WinstonModule } from 'nest-winston';
//import winston from 'winston';
//import path from 'path';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot(), //configService.getTypeOrmConfig()),
    //   WinstonModule.forRoot({
    //     level: 'info',
    //     format: winston.format.combine(
    //       winston.format.timestamp({
    //         format: 'YYYY-MM-DD HH:mm:ss',
    //       }),
    //       winston.format.errors({ stack: true }),
    //       winston.format.splat(),
    //       winston.format.json(),
    //     ),
    //     transports: [
    //       new winston.transports.File({
    //         dirname: path.join(__dirname, './../log/debug/'),
    //         filename: 'debug.log',
    //         level: 'debug',
    //       }),
    //       new winston.transports.File({
    //         dirname: path.join(__dirname, './../log/error/'),
    //         filename: 'error.log',
    //         level: 'error',
    //       }),
    //       new winston.transports.File({
    //         dirname: path.join(__dirname, './../log/info/'),
    //         filename: 'info.log',
    //         level: 'info',
    //       }),
    //       new winston.transports.Console({ level: 'debug' }),
    //     ],
    //   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
