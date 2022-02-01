// import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// export class CatRequestDto {
//   @ApiProperty({
//     example: 'sckroll@sckroll.com',
//     description: '고양이의 이메일입니다.',
//     required: true,
//   })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     example: 'sckroll',
//     description: '고양이의 이름입니다.',
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @ApiProperty({
//     example: 'asdfasdf',
//     description: '고양이의 비밀번호입니다.',
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   password: string;
// }

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
