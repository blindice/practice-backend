import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fld_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fld_code: string;
}
