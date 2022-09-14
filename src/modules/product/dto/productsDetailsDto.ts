import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailsDto {
  @ApiProperty()
  fld_id: number;

  @ApiProperty()
  fld_name: string;

  @ApiProperty()
  fld_code: string;
}
