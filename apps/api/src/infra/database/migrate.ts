import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

async function runMigrations() {
  console.log('⏳ Executando migrações no banco de dados...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    // Aponta para a pasta onde o drizzle-kit gera os arquivos .sql
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrações aplicadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao aplicar migrações:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();