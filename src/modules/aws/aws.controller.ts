import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/core/decorators/public.decorator';

@ApiTags('AWS S3')
@Controller('upload')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post()
  @IsPublic()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<{ filename: string; location: string }> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const { originalname } = file;

    try {
      const uploadResult = await this.awsService.uploadPublicFile(
        file.buffer,
        originalname,
      );

      return { filename: originalname, location: uploadResult.Location };
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao fazer upload do arquivo: ${error.message}`);
    }
  }
}
