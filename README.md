# ffvgs-backend

The Backend App for the ffvgs website

## Run

```
node index.js
```

## Run Local Database

```
docker run --name ffvgs-mysql -e  MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ffvgs -d  mysql:latest
```

Create a `.env` file in the root of the project with the following content:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=ffvgs
```
