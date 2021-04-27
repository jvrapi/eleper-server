import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatedUserTable1619531816335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'photo_url',
        type: 'varchar',
        collation: 'utf8_general_ci',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'photo_url');
  }
}
