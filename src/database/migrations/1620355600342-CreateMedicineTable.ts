import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMedicineTable1620355600342 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'medicine',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						length: '36',
						isPrimary: true,
					},
					{
						name: 'name',
						type: 'varchar',
						length: '100',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('medicine');
	}
}
