import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from './User';

@Entity()
class Exam {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column('varchar', { name: 'user_id' })
  userId: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @ManyToOne(() => User, (user) => user.exams)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Exam;
