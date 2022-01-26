import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    // 음수일 경우 예외 처리
    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }
    return value;
  }
}
