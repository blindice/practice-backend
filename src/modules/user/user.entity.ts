import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbl_users' })
export class User {
  @PrimaryGeneratedColumn()
  fld_id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
