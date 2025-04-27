import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import uploadLocal from 'src/common/multer/local.multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('avatar-local')
  @UseInterceptors(FileInterceptor('avatar', uploadLocal))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: UploadAvatarDto,
  })
  uploadAvatarLocal(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          //  new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatarLocal(file);
  }

  @Post('avatar-cloud')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: UploadAvatarDto,
  })
  uploadAvatarCloud(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatarCloud(file);
  }
}
