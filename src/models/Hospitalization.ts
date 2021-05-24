import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Disease from './Disease';
import User from './User';

@Entity()
class Hospitalization {
  @PrimaryColumn()
  readonly id: string;

  @Column('varchar', { name: 'user_id' })
  readonly userId: string;

  @Column('date', { name: 'entrance_date' })
  entranceDate: Date;

  @Column('date', { name: 'exit_date', nullable: true })
  exitDate: Date | null;

  @Column()
  location: string;

  @Column()
  reason: string;

  @ManyToOne(() => User, (user) => user.hospitalizations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Disease, { cascade: true })
  @JoinTable({
    name: 'hospitalization_disease',
    joinColumn: { name: 'hospitalization_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'disease_id', referencedColumnName: 'id' },
  })
  diseases: Disease[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Hospitalization;
