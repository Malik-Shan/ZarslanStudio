import { createContext } from "svelte";

export class OrgCreationFormStatus {
	formOpen = $state<boolean>(false);

	open(){
		this.formOpen = true;
	}
	close(){
		this.formOpen = false;
	}

};

export const [getOrgCreationFormStatus, setOrgCreationFormStatus, hasOrgCreationFormStatus] = createContext<OrgCreationFormStatus>()
