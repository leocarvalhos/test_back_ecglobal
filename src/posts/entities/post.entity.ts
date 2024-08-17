import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  comment: string;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @Column({ type: Date, default: new Date() })
  date: Date;
}
