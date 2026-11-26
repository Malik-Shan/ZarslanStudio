import {defineRelations} from 'drizzle-orm';
import * as schema from './schema.js'
const {authRelations, ...tables} = schema;

export const relations = {
   ...defineRelations(tables),
   ...authRelations, 
};
