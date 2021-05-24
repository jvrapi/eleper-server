import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';

import User from './User';

@Entity()
class UserToken {
	@PrimaryColumn()
	readonly id: string;

	@CreateDateColumn()
	created_at: Date;

	@Column({ name: 'user_id' })
	userId: string;

	@OneToOne(() => User, (user) => user.userToken)
	@JoinColumn({ name: 'user_id' })
	user: User;
}

export default UserToken;
