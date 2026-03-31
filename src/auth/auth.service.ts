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

        const access_token = this.jwtService.sign(payload);

        const refresh_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any,
        });

        const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);

        await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

        return {
            access_token: access_token,
            refresh_token: refresh_token,
        };
    }

    async refresh(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findOne(payload.sub);

            if (!user || !user.refreshToken) {
                throw new UnauthorizedException();
            }

            const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);

            if (!isMatch) {
                throw new UnauthorizedException();
            }

            const newAccessToken = this.jwtService.sign({
                sub: user.id,
                email: user.email,
                role: user.role.name,
            });

            return {
                access_token: newAccessToken,
            };

        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: number) {
        await this.usersService.updateRefreshToken(userId, null);
    }

}
