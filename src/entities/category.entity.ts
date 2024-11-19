import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;


  constructor(title: string) {    
    this.title = title;
  }

}
