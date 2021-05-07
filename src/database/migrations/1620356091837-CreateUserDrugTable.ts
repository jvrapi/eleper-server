import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserDrugTable1620356091837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_drug',
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
            name: 'drug_id',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'amount',
            type: 'tinyint',
            length: '1',
          },
          {
            name: 'active',
            type: 'tinyint',
            length: '1',
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
            name: 'FK_UserDrug_User',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            name: 'FK_UserDrug_Disease',
            columnNames: ['disease_id'],
            referencedTableName: 'disease',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_UserDrug_Drug',
            columnNames: ['drug_id'],
            referencedTableName: 'drug',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_drug');
  }
}
