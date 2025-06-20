import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1750444276234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS tb_users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
        
        CREATE TABLE IF NOT EXISTS tb_flights (
          id SERIAL PRIMARY KEY,
          flight_number TEXT NOT NULL,
          airline TEXT NOT NULL,
          origin TEXT NOT NULL,
          destination TEXT NOT NULL,
          departure TIMESTAMPTZ NOT NULL,
          arrival TIMESTAMPTZ NOT NULL,
          price DECIMAL NOT NULL,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
        
        CREATE TABLE IF NOT EXISTS tb_user_bookmarks (
          user_id INTEGER NOT NULL,
          flight_id INTEGER NOT NULL,
          PRIMARY KEY (user_id, flight_id),
          FOREIGN KEY (user_id) REFERENCES tb_users(id) ON DELETE CASCADE,
          FOREIGN KEY (flight_id) REFERENCES tb_flights(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS tb_user_bookmarks;
        DROP TABLE IF EXISTS tb_flights;
        DROP TABLE IF EXISTS tb_users;
    `);
  }
}
