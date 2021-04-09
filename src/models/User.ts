import bcrypt from 'bcryptjs';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import UserToken from './UserToken';

@Entity()
class User {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@Column()
	cpf: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	birth: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 12);
	}

	@OneToMany(() => UserToken, (userToken) => userToken.user)
	userToken: UserToken[];
}

export default User;
