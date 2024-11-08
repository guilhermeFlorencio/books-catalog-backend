import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@catalogolivros.com',
    description: 'E-mail do usuário',
  })
  email: string;

  @ApiProperty({ example: 'senha', description: 'Senha do usuário' })
  password: string;
}
