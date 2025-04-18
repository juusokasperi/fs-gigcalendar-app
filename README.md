## Jazz in Helsinki -app (WIP)

<img src="./img/preview.gif" alt="app preview" />

Currently runs locally with PostGresQL running in a Docker container. Backend fetches gigs from a public Google Calendar and parses the data into a SQL table. While fetching and parsing data from the Google Calendar, backend deletes past events from SQL database as well as scours for cancelled events. In addition to the fetching route, there is a gigs -route, which allows for manual searching, adding, updating and deleting events and a login -route for logging in as admin. Authentication is done using a hashed password and tokens.

Still to implement:
- Frontend doesn't yet use the gigs API, so missing manual addition and editing of events, and event highlighting.
- Possible server-side session.
- Nicer looking popup box for f.ex. refetching events.
- Overall more detail into the aesthetical part of the app.

### To run:

__Create__ env files according to `env.example` and `backend/env.example`

```
docker compose up -d	# Build & run PostGresQL
cd backend/
npm run dev		# Run in dev mode (nodemon)
npm run seed:admin	# Create an admin user
npm run migration:down	# Rollback latest migration
cd ../frontend
npm run dev		# Run frontend in dev mode
```
