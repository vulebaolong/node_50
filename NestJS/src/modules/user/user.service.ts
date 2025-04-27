import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadAvatarLocal(file: Express.Multer.File) {
    console.log(`avatarLocal`, file);
    if (!file) {
      throw new Error('No file upload');
    }

    //  vì chưa có logic protect kiểm tra token nên tạm thời fake lấy user trong prisma
    const user = await this.prismaService.users.findUnique({
      where: { id: 1 },
    });
    if (!user) throw new BadRequestException(`Không tìm thấy user`);
    const userId = Number(user.id);

    if (user?.avatar) {
      // nên dùng path để lấy ra đường dẫn chính xác trên mọi hệ điều hành (MacOS, linux, window)
      const oldFilePath = path.join('images', user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await this.prismaService.users.update({
      where: { id: userId },
      data: { avatar: file.filename },
    });

    return {
      folder: 'images/',
      filename: file.filename,
      imgUrl: `images/${file.filename}`,
    };
  }

  async uploadAvatarCloud(file: Express.Multer.File) {
    console.log(`avatarCloud`, file);
    if (!file) {
      throw new Error('No file upload');
    }

    //  vì chưa có logic protect kiểm tra token nên tạm thời fake lấy user trong prisma
    const user = await this.prismaService.users.findUnique({
      where: { id: 1 },
    });
    if (!user) throw new BadRequestException(`Không tìm thấy user`);
    const userId = Number(user.id);

    cloudinary.config({
      cloud_name: 'vulebaolong',
      api_key: '375481467533217',
      api_secret: 'IdhzUoK7jRyQceWSIdUI2x86g24',
    });

    if (user?.avatar) {
      console.log(user.avatar);
      const oldFilePath = path.join('images', user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      await cloudinary.uploader.destroy(user.avatar);
    }

    const uploadResult: UploadApiResponse = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream({ folder: 'images' }, (error, uploadResult) => {
          return resolve(uploadResult as UploadApiResponse);
        })
        .end(file.buffer);
    });

    console.log({ uploadResult });

    await this.prismaService.users.update({
      where: { id: userId },
      data: { avatar: uploadResult.public_id },
    });

    return {
      folder: uploadResult.folder,
      filename: file.filename,
      imgUrl: uploadResult.secure_url,
    };
  }
}
