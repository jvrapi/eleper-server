import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Disease from './Disease';
import Medicine from './Medicine';
import User from './User';

@Entity({ name: 'user_medicine' })
class UserMedicine {
  @PrimaryColumn()
  id: string;

  @Column('varchar', { name: 'user_id' })
  readonly userId: string;

  @Column('varchar', { name: 'disease_id' })
  readonly diseaseId: string;

  @Column('varchar', { name: 'medicine_id' })
  readonly medicineId: string;

  @Column()
  amount: string;

  @Column()
  instruction: string;

  @Column('date', { name: 'begin_date' })
  beginDate: Date;

  @Column('date', { name: 'end_date', nullable: true })
  endDate: Date | null;

  @ManyToOne(() => User, (user) => user.userDiseases)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Disease, (disease) => disease.userDiseases)
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;

  @ManyToOne(() => Medicine, (medicine) => medicine.userMedicines)
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default UserMedicine;
