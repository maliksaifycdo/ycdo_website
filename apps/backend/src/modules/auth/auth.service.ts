import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IAuthResponse } from '@ycdo/shared';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<IAuthResponse> {
    const user = await this.usersService.findByEmail(email, true);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      sub: String(user._id),
      email: user.email,
      role: user.role,
    });

    const { password: _password, ...safeUser } = user.toObject();
    return {
      token,
      user: {
        _id: String(safeUser._id),
        name: safeUser.name,
        email: safeUser.email,
        role: safeUser.role,
        createdAt: new Date().toISOString(),
      },
    };
  }
}
