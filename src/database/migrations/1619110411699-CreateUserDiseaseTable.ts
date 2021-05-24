import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserDiseaseTable1619110411699 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_disease',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						length: '36',
					},
					{
						name: 'user_id',
						type: 'varchar',
						length: '36',
					},
					{
						name: 'disease_id',
						type: 'varchar',
						length: '36',
					},
					{
						name: 'diagnosis_date',
						type: 'date',
						isNullable: true,
					},
					{
						name: 'active',
						type: 'tinyint',
						isNullable: true,
						length: '1',
						default: '1',
					},
				],
				foreignKeys: [
					{
						name: 'FK_UserDisease_Disease',
						referencedTableName: 'disease',
						referencedColumnNames: ['id'],
						columnNames: ['disease_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FK_UserDisease_User',
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_disease');
	}
}
