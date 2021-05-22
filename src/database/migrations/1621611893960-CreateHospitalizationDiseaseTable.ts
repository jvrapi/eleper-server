import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHospitalizationDiseaseTable1621611893960
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hospitalization_disease',
        columns: [
          {
            name: 'hospitalization_id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },

          {
            name: 'disease_id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_HospitalizationDisease_Hospitalization',
            columnNames: ['hospitalization_id'],
            referencedTableName: 'hospitalization',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },

          {
            name: 'FK_HospitalizationDisease_Disease',
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
    await queryRunner.dropTable('hospitalization_disease');
  }
}
