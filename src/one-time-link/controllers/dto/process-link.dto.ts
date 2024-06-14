import { IsHash } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IProcessLinkInput } from '../../services/interfaces';

export class ProcessLinkDto implements IProcessLinkInput {
  @ApiProperty()
  @IsHash('sha512')
  hash: string;
}
