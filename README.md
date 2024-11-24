# Act Digital API

## Overview

Act Digital API is a back-end application designed to handle survey creation and management as part of the Act digital back-end challenge. This project utilizes Node.js with TypeScript and PostgreSQL for data storage.

## Project Structure

- **Dockerfile**: Defines the environment for the application using Node.js.
- **docker-compose.yml**: Manages multi-container Docker applications, including the app and PostgreSQL database.
- **infrastructure/server.ts**: The entry point for the application, setting up the Express server and routing.
- **presentation**: Contains the routes for handling survey-related operations.
- **infrastructure**: Configures the PostgreSQL client for database interactions and sets up the Express server.
- **application**: Contains the business logic for creating surveys.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

   git clone git@github.com:Ctorum/act-digital-api.git
   cd act-digital-api

2. Build and run the application using Docker Compose:

   docker-compose up --build

## Scripts

- **start**: Runs the application using `ts-node`.
- **dev**: Runs the application in development mode using `nodemon`.

## Dependencies

- **express**: Web framework for Node.js.
- **pg**: PostgreSQL client for Node.js.
- **tsconfig-paths**: Module to load TypeScript paths.
- **yup**: Schema builder for runtime value parsing and validation.

## Development Dependencies

- **@types/express**: TypeScript definitions for Express.
- **@types/pg**: TypeScript definitions for PostgreSQL.
- **nodemon**: Tool that helps develop Node.js applications by automatically restarting the application when file changes are detected.
- **ts-node**: TypeScript execution environment for Node.js.
- **typescript**: TypeScript language.

## License

This project is licensed under the ISC License.
