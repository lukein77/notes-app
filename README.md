# Notes application

Simple application that allows the user to create, edit, delete and archive notes. Notes that are archived are shown separately by toggling the "Archived" button. Also, the user can add categories to each note and filter the list by category.

## Technologies

- Java 17.0.6
- npm 9.5.0
- Spring Boot 3.0.6
- MySQL 8.0
- React 18.2.0
- Tailwind CSS 3.3.2
- Material UI 5.12.3

## How to run

1. Clone the repository

2. Run `./run-app.sh` from the main directory. This will set up the MySQL database, and build both the backend and frontend apps.

3. Start the backend server with:
`java -jar target/backend-0.0.1-SNAPSHOT.jar`

4. Now, in the `frontend` directory, change `.env.example` to `.env` and set the `VITE_API_BASE_URL` variable. By default, the Spring Boot server runs at port 8080.

5. Finally, start the frontend client with `npm run dev`. The client should be running at `http://localhost:3000/`.


## REST API routes

The following routes are defined:

- **GET** /api/v1/notes
- **GET** /api/v1/notes/:id
- **GET** /api/v1/notes/archived
- **GET** /api/v1/notes/category=:category
- **GET** /api/v1/categories
- **POST** /api/v1/notes
- **PUT** /api/v1/notes/:id
- **PUT** /api/v1/notes/:id/archive=:value
- **DELETE** /api/v1/notes/:id


