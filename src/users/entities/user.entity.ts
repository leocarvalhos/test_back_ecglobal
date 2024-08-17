import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column()
  birthdate: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
