import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString({ message: 'Title phải là chuỗi' })
  @IsNotEmpty({ message: 'Title không được để trống' })
  @ApiProperty({ default: 'Điền title vào đây' })
  title: string;

  @IsString({ message: 'Content phải là chuỗi' })
  @IsNotEmpty({ message: 'Content không được để trống' })
  @ApiProperty({ default: 'Điền content vào đây' })
  content: string;

  @IsNumber(undefined, { message: `Views phải là số` })
  @IsNotEmpty({ message: 'Views không được để trống' })
  @ApiProperty({ default: 1 })
  views: number;
}
