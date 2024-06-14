import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateLinkInput } from '../../services/interfaces';

export class CreateLinkDto implements ICreateLinkInput {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  text: string;
}
