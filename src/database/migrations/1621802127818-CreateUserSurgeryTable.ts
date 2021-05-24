import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserSurgeryTable1621802127818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_surgery',
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
            name: 'surgery_id',
            type: 'varchar',
            length: '36',
          },

          {
            name: 'hospitalization_id',
            type: 'varchar',
            length: '36',
          },

          {
            name: 'after_effects',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_UserSurgery_User',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_UserSurgery_Surgery',
            columnNames: ['surgery_id'],
            referencedTableName: 'surgery',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_UserSurgery_Hospitalization',
            columnNames: ['hospitalization_id'],
            referencedTableName: 'hospitalization',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_surgery');
  }
}
