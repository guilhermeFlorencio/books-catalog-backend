import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único do livro' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Título do livro' })
  title: string;

  @Column()
  @ApiProperty({ description: 'Autor do livro' })
  author: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Descrição do livro' })
  description: string;

  @Column({ type: 'date' })
  @ApiProperty({
    description: 'Data de publicação do livro',
    example: '2023-01-01',
  })
  publishDate: Date;
}
