import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Hospitalization from './Hospitalization';
import Surgery from './Surgery';
import User from './User';

@Entity()
class UserSurgery {
	@PrimaryColumn()
	readonly id: string;

	@Column('varchar', { name: 'user_id' })
	readonly userId: string;

	@Column('varchar', { name: 'surgery_id' })
	readonly surgeryId: string;

	@Column('varchar', { name: 'hospitalization_id' })
	readonly hospitalizationId: string;

	@Column('varchar', { name: 'after_effects', nullable: true })
	afterEffects: string | null;

	@ManyToOne(() => User, (user) => user.userSurgeries)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Surgery, (surgery) => surgery.userSurgeries)
	@JoinColumn({ name: 'surgery_id' })
	surgery: Surgery;

	@ManyToOne(
		() => Hospitalization,
		(hospitalization) => hospitalization.userSurgeries
	)
	@JoinColumn({ name: 'hospitalization_id' })
	hospitalization: Hospitalization;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export default UserSurgery;
