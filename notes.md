Tällä hetkellä:
```
Dockerissa pyörii PostGresQL, jolla volume.

Fetch -route hakee tiedot iCalista, tallentaa keikat 28 päivän ajanjaksolta databaseen
(Jos keikka on jo kalenterissa, mutta tiedot muuttuneet, keikka päivitetään
Jos keikka on poistettu iCalista, poistetaan myös databasesta
Jos keikka on jo mennyt, poistetaan databasesta)
Gigs -route jonka kautta pystyy hakea, lisätä, poistaa ja päivittää keikkoja
Login -route, jota kautta voi kirjautua, palauttaa tokenin

Seed (npm run seed:admin) luo admin-userin env variable PASSWORDin pohjalta, ellei sitä jo databasessa

Admin-käyttäjällä oikeus lisätä keikkoja, muokata niitä, merkata important, poistaa sekä tehdä fetch iCalista.
```

Muistiinpanoja:
```
Loginia varten Context? Onko jarkea?

Frontend:
css-transition kun klikataan view / hide, joku hienompi arrow?

tekstille paddingiä että ei mee reunaan asti


Myöhemmin mieti:
Session -table (server-side session)? Onko tarpeellinen vai riittääkö nykynen login-checkaus?

CRON -> tee iCal fetch kerran / pv joskus aamuyöllä

Todo:
Backend testing
```

Ideas:
```
Frontend React (mobile first spa)

React Query, reducer tilan muuttamiseen, ehkä context tilan välittämiseen?

Perusnäkymässä voi näyttää keikat tänään, tällä viikolla, ens viikolla tai koko kk.

Eventtiä klikkaamalla sää näkyviin lisätiedot, perusmuotoisena näkyy title, startTime, location

Lisätiedoissa locationia klikkaamalla voi hakea muut tapahtumat, joilla sama location.

Hakukenttä, jolla voi hakea title tai location.


Unified layout.
Colors come from JazzFinland color scheme.

Testing?

Whole program can be started from root of app (docker compose)

Combines:
Backend & testing
Docker Container
Relational databases
API fetch
Styling with CSS

CI/CD pipeline
TypeScript
```
