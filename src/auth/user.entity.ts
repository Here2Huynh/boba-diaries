import { Entity, PrimaryColumn, ObjectIdColumn, Column } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
