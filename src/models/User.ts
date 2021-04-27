import bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import UserDisease from './UserDisease';
import UserToken from './UserToken';

@Entity()
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birth: Date;

  @Column('varchar', { nullable: true })
  code: string | null;

  @Column('varchar', { name: 'photo_url', nullable: true })
  photoUrl: string | null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  @OneToOne(() => UserToken, (userToken) => userToken.user)
  userToken: UserToken;

  @OneToMany(() => UserDisease, (userDisease) => userDisease.user)
  userDiseases: UserDisease[];
}

export default User;
