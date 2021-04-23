import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1617912935904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '320',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
            length: '11',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'birth',
            type: 'date',
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: true,
            length: '11',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
