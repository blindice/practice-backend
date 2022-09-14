import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'tbl_product' })
export class Product {
  @PrimaryGeneratedColumn()
  fld_id: number;

  @Column()
  fld_name: string;

  @Column()
  fld_code: string;
}
