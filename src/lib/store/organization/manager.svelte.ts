import { createContext } from 'svelte';
import { authClient } from '#lib/auth/authClient.js';

export type Organization = typeof authClient.$Infer.Organization;

export class OrganizationManager {
  constructor(
    private getServerOrganization: () => Organization | null,
    private getOrganizationList: () => Organization[] | null
  ) {}

  get organizations() {
    return this.getOrganizationList() ?? [];
  }

  get activeOrganization() {
    const serverOrg = this.getServerOrganization();

    if (!serverOrg) return null;

    return (
      this.organizations.find((org) => org.id === serverOrg.id) ??
      serverOrg
    );
  }
}

export const [
  getOrganizationManager,
  setOrganizationManager
] = createContext<OrganizationManager>();