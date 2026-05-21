import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateNewsletterLeadDto } from '@the-software-guys/types';

export class NestCreateNewsletterLeadDto implements CreateNewsletterLeadDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
