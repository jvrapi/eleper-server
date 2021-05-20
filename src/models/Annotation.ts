import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Disease from './Disease';
import User from './User';

@Entity()
class Annotation {
  @PrimaryColumn()
  readonly id: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  description: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'disease_id', nullable: true })
  diseaseId: string | null;

  @ManyToOne(() => User, (user) => user.annotations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Disease, (disease) => disease.annotations)
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Annotation;
