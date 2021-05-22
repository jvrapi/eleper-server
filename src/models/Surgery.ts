import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Hospitalization from './Hospitalization';

@Entity()
class Surgery {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(
    () => Hospitalization,
    (hospitalization) => hospitalization.surgery
  )
  hospitalizations: Hospitalization[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Surgery;
