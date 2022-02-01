import { CatsRepository } from './cats.repository';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  // constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    // 1. 유효성 검사: 고양이 존재 유무 확인
    // const isCatExist = await this.catModel.exists({ email });
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 401);
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    // 2. 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. DB 저장
    // const cat = await this.catModel.create({
    //   email,
    //   name,
    //   password: hashedPassword,
    // });
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
