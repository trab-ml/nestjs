# Prisma commands

| Command | Necessity | Use | Why | How | When |
|---------|-----------|-----|-----|-----|------|
| `prisma migrate save` | Necessary to create new migration file | When making changes to Prisma schema | Generates a migration file describing schema changes | Run `npx prisma migrate save --name <migration-name>` | When modifying Prisma schema |
| `prisma migrate up` | Necessary to apply pending migrations | After creating or modifying migration files | Applies pending migrations to synchronize database schema | Run `npx prisma migrate up` | After creating or modifying migration files |
| `prisma migrate down` | Necessary to roll back last applied migration | To revert changes made by last migration | Rolls back last applied migration to revert schema changes | Run `npx prisma migrate down` | When needing to revert changes made by last migration |
| `prisma migrate dev` | Convenient for development workflow | During development to streamline migration | Automates creation and application of migrations | Run `npx prisma migrate dev` | Frequently during development to keep schema and database in sync |
| `prisma generate` | Necessary to generate Prisma Client | After modifying Prisma schema | Generates Prisma Client with type-safe database access | Run `npx prisma generate` | After modifying Prisma schema |
| `prisma migrate dev` | A combination of `prisma migrate save`, `prisma migrate up` and `prisma generate` in dev env| | | `prisma migrate dev --name <migration-name>` | |
