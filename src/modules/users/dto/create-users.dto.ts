import { InformationUsersEntity } from '../schema/information_users.schema';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUsersDto {
  @ApiProperty({
    example: 'Cuongtran95',
  })
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'name: Sơn',
  })
  information: Partial<InformationUsersEntity>;

  @ApiProperty({
    example: 'ADMIN',
  })
  role: string;
}

export class CreateStudentDto {
  @ApiProperty({
    example: 'Cuongtran95',
  })
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @ApiProperty({
    example: '',
  })
  information: Partial<InformationUsersEntity>;
}
