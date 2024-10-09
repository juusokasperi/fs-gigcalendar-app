### Jazz in Helsinki -app

Aluksi:
Toteuta backend, joka hakee tiedot google-kalenterista ja tallentaa kaikki keikat 2 kuukauden sisällä PostGRES databaseen.

Lisää admin-käyttäjä, jolla oikeus lisätä keikkoja, muokata niitä, poistaa ite lisättyjä sekä tehdä force re-fetch iCalista.


Toka askel lisää PostGRES toteutus. Tätä varten tarvitaan create /api/gigs sekä update /api/gigs/:id sekä delete /api/gigs/:id
Tarvitaan myös toiminnallisuus joka yhdistää nämä. Infinity scrolling ois hyvä? Vai pitäskö kuitenkin tehä normi React appi, että sen sais deployattua ilmaseks.

Ideas:
Frontend built using React Native

Backend fetches gigs calendar from Google calendar API and local PostGres database container.

Also provides a webpage for admin access, where admin user can add gigs to the PostGres db.

Layout done using ?what? - needs to be unified for the webpage and the mobile app.
Colors come from JazzFinland color scheme.

Testing?

Whole program can be started from root of app (docker compose)

Combines:
Backend & testing
Docker Container
Relational databases
API fetch
Styling with CSS

Maybe implement a CI/CD pipeline?
TypeScript?
