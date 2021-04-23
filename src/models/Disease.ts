import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import UserDisease from './UserDisease';

@Entity()
class Disease {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => UserDisease, (userDisease) => userDisease.user)
  userDiseases: UserDisease[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Disease;
