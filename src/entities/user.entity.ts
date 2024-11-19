import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }
}