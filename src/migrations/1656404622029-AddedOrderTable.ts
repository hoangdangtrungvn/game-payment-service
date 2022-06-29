import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedOrderTable1656404622029 implements MigrationInterface {
    name = 'AddedOrderTable1656404622029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`game_id\` int NOT NULL DEFAULT '0', \`user_id\` int NOT NULL DEFAULT '0', \`ref_code\` varchar(255) NULL, \`paygate\` varchar(255) NULL, \`payload\` json NOT NULL, \`webhook\` json NOT NULL, \`status\` smallint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_2fb0b0a5b83ca5d0a43e88ef9b\` (\`game_id\`), INDEX \`IDX_a922b820eeef29ac1c6800e826\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a922b820eeef29ac1c6800e826\` ON \`orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_2fb0b0a5b83ca5d0a43e88ef9b\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
