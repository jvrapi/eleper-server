import bcrypt from 'bcryptjs';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Annotation from './Annotation';
import Exam from './Exam';
import Hospitalization from './Hospitalization';
import UserDisease from './UserDisease';
import UserMedicine from './UserMedicine';
import UserSurgery from './UserSurgery';
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

	@Column('varchar', { nullable: true })
	code: string | null;

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

	@OneToOne(() => UserToken, (userToken) => userToken.user)
	userToken: UserToken;

	@OneToMany(() => UserDisease, (userDisease) => userDisease.user)
	userDiseases: UserDisease[];

	@OneToMany(() => Annotation, (annotation) => annotation.user)
	annotations: Annotation[];

	@OneToMany(() => Exam, (exam) => exam.user)
	exams: Exam[];

	@OneToMany(() => Hospitalization, (hospitalization) => hospitalization.user)
	hospitalizations: Hospitalization[];

	@OneToMany(() => UserSurgery, (userSurgery) => userSurgery.user)
	userSurgeries: UserSurgery[];
}

export default User;
