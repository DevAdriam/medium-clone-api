import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { Responser } from 'src/libs/Responser';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async login(dto: LoginDto) {
    try {
      const foundUser = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });

      if (!foundUser) throw new UnauthorizedException('Email is not valid');

      const isPwMatch = await argon.verify(foundUser.password, dto.password);

      if (!isPwMatch) throw new UnauthorizedException('Password wrong');

      const tokens = await this.getTokens({
        id: foundUser.id,
        email: foundUser.email,
      });

      return Responser({
        statusCode: 200,
        message: 'User successfully login',
        devMessage: 'User login success',
        body: {
          ...tokens,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Wrong Credentials',
          devMessage: 'Wrong credentials',
        },
        401,
      );
    }
  }

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });

      if (existingUser)
        throw new HttpException(
          {
            message: 'Email is already taken',
            devMessage: 'Email is taken',
          },
          401,
        );

      const hashPassword = await hash(dto.password);

      const newUser = await this.prisma.user.create({
        data: {
          firstname: dto.firstname,
          lastname: dto.lastname,

          email: dto.email,
          password: hashPassword,
        },
      });

      return Responser({
        statusCode: 201,
        message: 'User successfully created',
        devMessage: 'User successfully created',
        body: {
          newUser,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Email or Password is already taken',
          devMessaage: 'Credentials already taken',
        },
        401,
      );
    }
  }

  private async getTokens({ id, email }) {
    const payload = {
      id,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: process.env.SECRET_KEY,
        expiresIn: '1d',
      }),

      this.jwt.signAsync(
        {
          id: id,
        },

        {
          secret: process.env.REFRESH_KEY,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
