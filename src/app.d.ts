import type { createAuth } from './lib/server/auth';
import type { createD1Client } from './lib/server/db';

type Auth = ReturnType<typeof createAuth>
type User = Auth['$Infer']['Session']['user']
type Session = Auth['$Infer']['Session']['session']


// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Locals { 
			db: ReturnType<typeof createD1Client>;
			auth: ReturnType<typeof createAuth>;
			user: User | null;
			session: Session | null;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
