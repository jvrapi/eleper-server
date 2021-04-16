import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTableUpdates1618597905806 implements MigrationInterface {
	name = 'UserTableUpdates1618597905806';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `user_token` DROP FOREIGN KEY `FK_User`'
		);
		await queryRunner.query(
			'DROP INDEX `UQ_e12875dfb3b1d92d7d7c5377e22` ON `user`'
		);
		await queryRunner.query(
			'DROP INDEX `UQ_a6235b5ef0939d8deaad755fc87` ON `user`'
		);
		await queryRunner.query(
			'ALTER TABLE `user_token` DROP COLUMN `created_at`'
		);
		await queryRunner.query(
			'ALTER TABLE `user_token` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)'
		);
		await queryRunner.query('ALTER TABLE `user` DROP COLUMN `cpf`');
		await queryRunner.query(
			'ALTER TABLE `user` ADD `cpf` varchar(255) NOT NULL'
		);
		await queryRunner.query('ALTER TABLE `user` DROP COLUMN `birth`');
		await queryRunner.query('ALTER TABLE `user` ADD `birth` datetime NOT NULL');
		await queryRunner.query('ALTER TABLE `user` DROP COLUMN `code`');
		await queryRunner.query(
			'ALTER TABLE `user` ADD `code` varchar(255) NOT NULL'
		);
		await queryRunner.query(
			'ALTER TABLE `user_token` ADD CONSTRAINT `FK_79ac751931054ef450a2ee47778` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `user_token` DROP FOREIGN KEY `FK_79ac751931054ef450a2ee47778`'
		);
		await queryRunner.query('ALTER TABLE `user` DROP COLUMN `code`');
		await queryRunner.query('ALTER TABLE `user` ADD `code` varchar(11) NULL');
		await queryRunner.query('ALTER TABLE `user` DROP COLUMN `birth`');
		await queryRunner.query('ALTER TABLE `user` ADD `birth` date NOT NULL');
		await queryRunner.query('ALTER TABLE `user` DROP COLUMN `cpf`');
		await queryRunner.query(
			'ALTER TABLE `user` ADD `cpf` varchar(11) NOT NULL'
		);
		await queryRunner.query(
			'ALTER TABLE `user_token` DROP COLUMN `created_at`'
		);
		await queryRunner.query(
			'ALTER TABLE `user_token` ADD `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP'
		);
		await queryRunner.query(
			'CREATE UNIQUE INDEX `UQ_a6235b5ef0939d8deaad755fc87` ON `user` (`cpf`)'
		);
		await queryRunner.query(
			'CREATE UNIQUE INDEX `UQ_e12875dfb3b1d92d7d7c5377e22` ON `user` (`email`)'
		);
		await queryRunner.query(
			'ALTER TABLE `user_token` ADD CONSTRAINT `FK_User` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE'
		);
	}
}
