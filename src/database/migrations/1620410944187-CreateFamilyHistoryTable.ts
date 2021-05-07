import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFamilyHistoryTable1620410944187
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'family_history',
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
            name: 'family_relative',
            type: 'varchar',
            length: '50',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_FamilyHistory_User',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_FamilyHistory_Disease',
            columnNames: ['disease_id'],
            referencedTableName: 'disease',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('family_history');
  }
}
