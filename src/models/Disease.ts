import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Annotation from './Annotation';
import UserDisease from './UserDisease';

@Entity()
class Disease {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => UserDisease, (userDisease) => userDisease.user)
  userDiseases: UserDisease[];

  @OneToMany(() => Annotation, (annotation) => annotation.disease)
  annotations: Annotation[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Disease;
