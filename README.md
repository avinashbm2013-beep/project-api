# Project API

A simple REST API for managing projects built with Express.js

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### GET all projects
```
GET /api/projects
```
Returns a list of all projects.

### GET project by ID
```
GET /api/projects/:id
```
Returns a specific project by ID.

### POST create new project
```
POST /api/projects
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Project description"
}
```

### PUT update project
```
PUT /api/projects/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

### DELETE project
```
DELETE /api/projects/:id
```
Deletes a project by ID.

## Running Tests

Start the server in one terminal:
```bash
npm start
```

In another terminal, run the tests:
```bash
npm test
```

This will run a series of API calls to test all endpoints.
