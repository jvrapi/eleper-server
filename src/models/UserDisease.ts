import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Disease from './Disease';
import User from './User';

@Entity()
class UserDisease {
	@PrimaryColumn()
	id: string;

	@Column('varchar', { name: 'user_id' })
	readonly userId: string;

	@Column('varchar', { name: 'disease_id' })
	readonly diseaseId: string;

	@Column('date', { name: 'diagnosis_date', nullable: true })
	diagnosisDate: Date | null;

	@Column('tinyint', { nullable: true, default: () => '1' })
	active: boolean;

	@ManyToOne(() => User, (user) => user.userDiseases)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Disease, (disease) => disease.userDiseases)
	@JoinColumn({ name: 'disease_id' })
	disease: Disease;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export default UserDisease;
