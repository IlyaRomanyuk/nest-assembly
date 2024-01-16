import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSchemasCoreEvents1705157218421 implements MigrationInterface {
  name = 'AddSchemasCoreEvents1705157218421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "events" ("id" SERIAL NOT NULL, "summary" character varying, "description" character varying, "location" character varying, "time_start" TIMESTAMP WITH TIME ZONE NOT NULL, "time_end" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_attendees" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "event_id" integer, CONSTRAINT "PK_27510e317f002b361d2904d7f0f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_attendees" ADD CONSTRAINT "FK_ff98c4d7c3e85237115140cf69e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_attendees" ADD CONSTRAINT "FK_c296e70709cd6f4cb6b4e3e7e2a" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_attendees" DROP CONSTRAINT "FK_c296e70709cd6f4cb6b4e3e7e2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_attendees" DROP CONSTRAINT "FK_ff98c4d7c3e85237115140cf69e"`,
    );
    await queryRunner.query(`DROP TABLE "event_attendees"`);
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
