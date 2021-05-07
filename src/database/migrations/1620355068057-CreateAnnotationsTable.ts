import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAnnotationsTable1620355068057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'annotation',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            length: '36',
          },
          {
            name: 'disease_id',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '100',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_Annotation_Disease',
            columnNames: ['disease_id'],
            referencedTableName: 'disease',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_Annotation_User',
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
    await queryRunner.dropTable('annotation');
  }
}
