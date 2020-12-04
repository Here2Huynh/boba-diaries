import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Boba {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  shop: string;

  @Column()
  rating: string;

  @Column()
  description: string;

  @Column()
  date: string;
}
