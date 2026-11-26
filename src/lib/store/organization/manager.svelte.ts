import { createContext } from 'svelte';
import { authClient } from '#lib/auth/authClient.js';
import { SvelteMap } from 'svelte/reactivity';

export type Organization = typeof authClient.$Infer.Organization;
export type Member = typeof authClient.$Infer.Member;

export class OrganizationManager {

  activeOrganization = $state<Organization | null>(null);
  // organizations = new SvelteMap<string, Organization>();

  constructor(
    {active}: {active: Organization | null},
    private getOrganizationList: () => Organization[] | null
  ) {
    this.activeOrganization = active;

    // const organizationList = this.getOrganizationList();
    //
    // if(organizationList){
    //   organizationList.map((org) => {
    //     this.addOrganization(org);
    //   })
    // }


  }

  organizations = $derived.by<SvelteMap<string, Organization>>(() => {
    const organizations = new SvelteMap<string, Organization>();
    const organizationList = this.getOrganizationList();

    if(!organizationList || organizationList.length === 0) return organizations;

    organizationList.map((org) => {
      organizations.set(org.id, org);
    })
    return organizations;
  })

  setActiveOrganization = (org: Organization) => {
    if(!org) return;
    this.activeOrganization = org;
  };

  // removeOrganization = (id:string) => {
  //   if(!id || this.organizations.size === 0) return;
  //   this.organizations.delete(id);
  // };
  //
  // addOrganization = (org: Organization) => {
  //   if(!org || !org.id) return;
  //   this.organizations.set(org.id, org);
  // };

}

export const [
  getOrganizationManager,
  setOrganizationManager
] = createContext<OrganizationManager>();
