import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import UserSurgery from './UserSurgery';

@Entity()
class Surgery {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@OneToMany(() => UserSurgery, (userSurgery) => userSurgery.user)
	userSurgeries: UserSurgery[];

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export default Surgery;
