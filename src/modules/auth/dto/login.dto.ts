import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
export class LoginDto {
  @ApiProperty({
    example: 'Cuongtran95',
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
