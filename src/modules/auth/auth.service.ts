import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      type: user.type,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: 'Nenhuma',
        };
      }
    }

    throw new Error('O email ou  senha informada está incorreta');
  }
}
