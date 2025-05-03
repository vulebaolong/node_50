import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const userExsit = await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExsit)
      throw new BadRequestException(
        `Tài khoản chưa tồn tại, vui lòng đăng ký ::1`,
      );
    // if (!userExsit) throw new BadRequestException(`Tài khoản không hợp lệ ::1`);

    if (!userExsit?.password)
      throw new BadRequestException(
        `Vui lòng đăng nhập bằng google hoặc facebook, để cập nhật mật khẩu mới`,
      );

    const isPassword = bcrypt.compareSync(password, userExsit.password);
    if (!isPassword) {
      // logic kiểm tra nếu đăng nhập quá 3 lần, lưu dấu vết hoặc cho vào blacklist để theo
      // logger.error(
      //   `${userExsit.id} đăng nhập quá 3 lần, lưu dấu vết hoặc cho vào blacklist`,
      // );
      throw new BadRequestException(`Mật khẩu không chính xác ::2`);
    }
    // if (!isPassword) throw new BadRequestException(`Tài khoản không hợp lệ ::2`);

    const tokens = this.tokenService.createTokens(userExsit.id);

    return tokens;
  }
}
