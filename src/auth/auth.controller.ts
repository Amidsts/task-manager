import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth.credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return await this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  async signin(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return await this.authService.signin(authCredentialDto);
  }
}
