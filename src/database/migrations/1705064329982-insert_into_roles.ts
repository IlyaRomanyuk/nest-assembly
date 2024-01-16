import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertIntoRoles1705064329982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER SEQUENCE "roles_id_seq" RESTART WITH 1`);
    await queryRunner.query(
      `INSERT INTO "roles" (role, name,"created_at","updated_at") VALUES (1, 'PATIENT', '2024-01-12 15:53:24.945 +00:00','2024-01-12 15:53:24.945 +00:00')`,
    );
    await queryRunner.query(
      `INSERT INTO "roles" (role, name,"created_at","updated_at") VALUES (4, 'RECEPTIONIST', '2024-01-12 15:53:24.945 +00:00','2024-01-12 15:53:24.945 +00:00')`,
    );
    await queryRunner.query(
      `INSERT INTO "roles" (role, name,"created_at","updated_at") VALUES (16, 'MANAGER', '2024-01-12 15:53:24.945 +00:00','2024-01-12 15:53:24.945 +00:00')`,
    );
    await queryRunner.query(
      `INSERT INTO "roles" (role, name,"created_at","updated_at") VALUES (64, 'DOCTOR', '2024-01-12 15:53:24.945 +00:00','2024-01-12 15:53:24.945 +00:00')`,
    );
    await queryRunner.query(
      `INSERT INTO "roles" (role, name,"created_at","updated_at") VALUES (256, 'ADMIN', '2024-01-12 15:53:24.945 +00:00','2024-01-12 15:53:24.945 +00:00')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "roles"`);
  }
}
