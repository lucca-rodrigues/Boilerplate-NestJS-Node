import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Post } from './Post.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ type: 'varchar', length: 300 })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @ApiProperty()
  email: string;

  // @OneToMany((type) => Post, (item) => item.id)
  // posts: Post[];
}
