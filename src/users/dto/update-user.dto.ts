import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
/*
Toma CreateUserDto y lo convierte en:
{
  email?: string;
  password?: string;
}
*/