import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import UserMedicine from './UserMedicine';

@Entity()
class Medicine {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@OneToMany(() => UserMedicine, (userMedicine) => userMedicine.medicine)
	userMedicines: UserMedicine[];

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export default Medicine;
