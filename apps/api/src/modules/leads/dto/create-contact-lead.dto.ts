import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateContactLeadDto } from '@the-software-guys/types';

export class NestCreateContactLeadDto implements CreateContactLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  projectType!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  message!: string;
}
