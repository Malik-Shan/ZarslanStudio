import { createContext } from 'svelte';
import type { User as user, Session as session } from '../server/auth';

export class User {

   user = $state<user | null>(null);
   session = $state<session | null>(null);

   constructor({user, session}:{user:user|null, session:session|null}){
      this.user = user;
      this.session = session;
   };

   logout = () => {
      this.user = null;
      this.session = null
   };

}

export const [getUser, setUser, hasUser] = createContext<User>();
