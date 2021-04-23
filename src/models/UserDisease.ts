import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import Disease from './Disease';
import User from './User';

@Entity({ name: 'user_disease' })
class UserDisease {
  @PrimaryColumn('varchar', { name: 'user_id' })
  readonly userId: string;

  @PrimaryColumn('varchar', { name: 'disease_id' })
  readonly diseaseId: string;

  @Column('varchar', { name: 'diagnosis_date', nullable: true })
  diagnosisDate: Date | null;

  @Column()
  active: boolean;

  @ManyToOne(() => User, (user) => user.userDiseases)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Disease, (disease) => disease.userDiseases)
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;
}

export default UserDisease;
