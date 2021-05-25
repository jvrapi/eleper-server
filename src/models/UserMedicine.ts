import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Medicine from './Medicine';
import UserDisease from './UserDisease';

@Entity()
class UserMedicine {
	@PrimaryColumn()
	readonly id: string;

	@Column('varchar', { name: 'user_disease_id' })
	readonly userDiseaseId: string;

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

	@ManyToOne(() => UserDisease, (userDisease) => userDisease.userMedicines)
	@JoinColumn({ name: 'user_disease_id' })
	userDisease: UserDisease;

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
