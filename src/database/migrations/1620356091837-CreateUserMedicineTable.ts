import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserMedicineTable1620356091837
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_medicine',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						length: '36',
						isPrimary: true,
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
						name: 'medicine_id',
						type: 'varchar',
						length: '36',
					},
					{
						name: 'amount',
						type: 'varchar',
						length: '100',
					},

					{
						name: 'instruction',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'begin_date',
						type: 'date',
					},
					{
						name: 'end_date',
						type: 'date',
						isNullable: true,
					},
				],
				foreignKeys: [
					{
						name: 'FK_UserMedicine_User',
						columnNames: ['user_id'],
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
					},
					{
						name: 'FK_UserMedicine_Disease',
						columnNames: ['disease_id'],
						referencedTableName: 'disease',
						referencedColumnNames: ['id'],
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
					},
					{
						name: 'FK_UserMedicine_Medicine',
						columnNames: ['medicine_id'],
						referencedTableName: 'medicine',
						referencedColumnNames: ['id'],
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_medicine');
	}
}
