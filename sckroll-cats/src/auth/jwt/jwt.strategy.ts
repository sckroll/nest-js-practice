import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // 보안 상의 이유로 req.user에 저장할 때 password 필드 제거
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat; // req.user에 들어가는 객체
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
