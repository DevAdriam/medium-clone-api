import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  Login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  Register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
