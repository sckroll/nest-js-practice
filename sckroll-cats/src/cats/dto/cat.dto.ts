import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// export class ReadOnlyCatDto {
//   @ApiProperty({
//     example: '12930565',
//     description: '고양이의 ID입니다.',
//   })
//   id: string;

//   @ApiProperty({
//     example: 'sckroll@sckroll.com',
//     description: '고양이의 이메일입니다.',
//     required: true,
//   })
//   email: string;

//   @ApiProperty({
//     example: 'sckroll',
//     description: '고양이의 이름입니다.',
//     required: true,
//   })
//   name: string;
// }

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '12930565',
    description: '고양이의 ID입니다.',
  })
  id: string;
}
