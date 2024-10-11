### Jazz in Helsinki -app

## To run:

__Create__ env files according to `env.example` and `backend/env.example`

```
docker compose up -d	# Build & run PostGresQL
cd backend/
npm run dev		# Run in dev mode (nodemon)
npm run seed:admin	# Create an admin user
npm run migration:down	# Rollback latest migration
```
