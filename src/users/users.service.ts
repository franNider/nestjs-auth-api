import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //Hashear password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const role = await this.roleRepository.findOneBy({ name: 'USER' });
    if (!role) {
      throw new Error('Role USER no existe');
    }
    //Crear usuario
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
    });

    //Guardar en DB
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['role'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return { message: 'Usuario eliminado' };
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) return;

    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  }


}
