import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExamTable1619574208182 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'exam',
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
						name: 'name',
						type: 'varchar',
						length: '100',
					},
					{
						name: 'path',
						type: 'varchar',
						length: '100',
					},

					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FK_Exam_User',
						columnNames: ['user_id'],
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('exam');
	}
}
