import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;


 
  constructor() {
    this.id = 0;
    this.title = '';
  
  }

}
