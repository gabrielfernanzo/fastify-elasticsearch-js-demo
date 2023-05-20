<h1 align=center> Fastify-ElasticSearch Demo</h1>

## `Description`

This is a basic Reminders microsservice with two action routes and one for healchecking: 
- `POST /reminders` - for indexing data
- `GET /reminders/_search` - for searching data based on query params
- `GET /` - for making sure everythng is working just fine

You can access Kibana instance on _http://localhost:5601_

---

## `Starting`
In order to start adding reminders to your Elastcsearch instance, make sure you have [Docker & Docker-Compose]() installed on your machine.
Then, double-check your `.env` file, and then just run the following command:
```bash
docker-compose up
``` 

---

## `Stopping`

```bash
docker-compose down
```