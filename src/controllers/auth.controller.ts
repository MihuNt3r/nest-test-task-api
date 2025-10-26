import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { LoginSchema, RegisterSchema } from '../shared/dtos/auth/auth.schemas'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   */
  @Post('register')
  async register(@Body() body: any) {
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      // Returning Zod validation errors in a readable format
      return {
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { email, username, name, password } = parsed.data;

    return this.authService.register(email, username, name, password);
  }

  /**
   * POST /auth/login
   */
  @Post('login')
  async login(@Body() body: any) {
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return {
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { email, password } = parsed.data;
    return this.authService.login(email, password);
  }
}
