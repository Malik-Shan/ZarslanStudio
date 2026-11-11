![Logo](src/lib/assets/favicon/android-chrome-512x512.png)

# Zarslan Studio (Social Media Management)
## Commands

| Command | Action |
|:---|:---|
| `pnpm dev` | Starts the development server. |
| `pnpm build` | Builds the production site. |
| `pnpm check` | Checks TypeScript, JavaScript, CSS, and accessibility issues. |
| `pnpm db:push` | Syncs schema changes directly to the database. |
| `pnpm db:generate` | Generates SQL migration files. |
| `pnpm db:migrate` | Applies migrations to the database. |
| `pnpm db:studio` | Opens the visual database management interface. |
| `pnpm auth:schema` | Generates Better Auth database schema. |
## Todo List
Priority:
- [ ] Ability to select org and redirect.
- [ ] Show the active or no-org-select if on the `dashboard`
- [ ] User --> profile setting (/dahboard/profile)
- [ ] Org --> setting page (showing members & all invitations sent)
- [ ] User --> org page (ability to see, leave orgs & see pending invitations sent to you)
- [ ] org package creation (provindg all the details) - since it's all custom there should be a way for to check for completion of certain package or it's limits by us. so user can create within certains contrains requiring they provinde some info for us to easily fetch it.

Future:
- [ ] Task page for org client role only
- [ ] Task page for team role only
- [ ] Drives & link management
- [ ] File sharing and upload for client or team (Using Uploadthing)
- [ ] Sharing scripts with parts and ability to edit and show the changed parts.