import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserDiseaseTable1619110411699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_disease',
        columns: [
          {
            name: 'user_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'disease_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'diagnosis_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'tinyint',
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
