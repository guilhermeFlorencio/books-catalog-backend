import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BooksModule {}
