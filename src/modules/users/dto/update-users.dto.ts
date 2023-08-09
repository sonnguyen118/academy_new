import { PartialType } from '@nestjs/swagger';
import { CreateUsersDto } from './create-users.dto';
import { InformationUsersEntity } from '../schema/information_users.schema';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUsersDto) {
  _id: string;

  userName: string;

  password: string;

  information: InformationUsersEntity;

  isActive: boolean;

  isDelete: boolean;
}

export class ChangePassWordUserDto extends PartialType(CreateUsersDto) {
  @ApiProperty({
    example: 'Ngáo Đá 995',
  })
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @ApiProperty({
    example: '12345@@',
  })
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiProperty({
    example: '12345@@',
  })
  @IsNotEmpty()
  @MinLength(3)
  repassword: string;
}

export class UpdateStudentDto {
  @ApiProperty({
    example: 'code',
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'userName',
  })
  userName: string;

  @ApiProperty({
    example: '',
  })
  information: Partial<InformationUsersEntity>;
}
