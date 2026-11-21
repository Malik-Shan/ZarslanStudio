import type {User, Session} from 'better-auth';
import type {DrizzleClient} from '#lib/server/db';
import type {BetterAuth} from '#lib/server/auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env,
			cf: CfProperties,
			ctx: ExecutionContext
		}

		interface Locals { 
			db: DrizzleClient;
			auth: BetterAuth;
			user: User; 
			session: Session;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
