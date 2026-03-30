import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);
        
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: user.id, email: user.email, role: user.role.name };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
