import { Response } from 'express';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ECreateErrorCode, EProcessErrorCode } from '../services/interfaces';
import { OneTimeLinkStoragePostgresService } from '../services/one-time-link.storage-postgres.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { ProcessLinkDto } from './dto/process-link.dto';

@Controller('one-time-link')
export class OneTimeLinkController {
  constructor(private readonly service: OneTimeLinkStoragePostgresService) {}

  @ApiCreatedResponse()
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get('/create')
  public async createLink(
    @Query() dto: CreateLinkDto,
    @Res() res: Response,
  ): Promise<Response> {
    const [hash, errorCode] = await this.service.createLink(dto);
    switch (errorCode) {
      case ECreateErrorCode.storage:
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      case ECreateErrorCode.conflict:
        return res.sendStatus(HttpStatus.CONFLICT);
      default:
        const link = `/api/one-time-link/process?hash=${hash}`;
        return res.status(HttpStatus.CREATED).send(link);
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get('/process')
  public async processLink(
    @Query() dto: ProcessLinkDto,
    @Res() res: Response,
  ): Promise<Response> {
    const [text, errorCode] = await this.service.processLink(dto);
    switch (errorCode) {
      case EProcessErrorCode.storage:
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      case EProcessErrorCode.notFound:
        return res.sendStatus(HttpStatus.NOT_FOUND);
      default:
        return res.status(HttpStatus.OK).send(text);
    }
  }
}
