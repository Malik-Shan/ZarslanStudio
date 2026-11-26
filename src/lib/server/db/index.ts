import { drizzle as drizzleLibsql, type LibSQLDatabase } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1, type DrizzleD1Database } from 'drizzle-orm/d1';
import {createClient} from '@libsql/client';
import {relations} from './relations.js';

export function createLibSqlClient(url: string): LibSQLDatabase<typeof relations> {
   const client = createClient({url});
   return drizzleLibsql({client, relations});
};

export function createD1Client(database: D1Database): DrizzleD1Database<typeof relations> {
   return drizzleD1(database, {relations});
}


