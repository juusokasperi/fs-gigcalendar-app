#!/bin/sh

export POSTGRES_PASSWORD=$(cat /run/secrets/postgres_password | tr -d '\n')
export PASSWORD=$(cat /run/secrets/admin_password | tr -d '\n')
export POSTGRES_URL=postgres://postgres:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/postgres

cd /app/

until pg_isready -h postgres -p 5432; do
	echo "Waiting for postgres.."
	sleep 1
done

npm install --include=dev
npm run seed:secret		# Seed JWT secret
npm run migration:up	# Run migrations
npm run seed:admin		# Seed an admin user into DB

exec npm run dev
