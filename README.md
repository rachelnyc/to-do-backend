# To-Do List Backend App

This is the backend server for a simple To-Do List application. It allows you to create, get, update, and delete tasks. It uses Node.js and Express.js for handling API requests and a flat JSON file as a database to store tasks.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/rachelnyc/to-do-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd to-do-backend
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run start
   ```

The server should now be running on `http://localhost:5000`.

## API Endpoints

### GET /tasks

Retrieve a list of all tasks.

Example Request:
```
GET http://localhost:5000/tasks
```

Example Response:
```json
[
  {
    "_id": "abc123",
    "taskName": "Buy groceries",
    "completed": false,
    "completedAt": null
  },
  // ... other tasks
]
```

### POST /tasks

Add a new task.

Example Request:
```
POST http://localhost:5000/tasks
Content-Type: application/json

{
  "taskName": "Clean the garage"
}
```

Example Response:
```json
{
  "_id": "def456",
  "taskName": "Clean the garage",
  "completed": false,
  "completedAt": null
}
```

### PUT /tasks/:id

Toggle the completion status of a task.

Example Request:
```
PUT http://localhost:5000/tasks/abc123
Content-Type: application/json

{
  "completedAt": "2023-08-08T12:00:00Z"
}
```

Example Response:
```json
{
  "_id": "abc123",
  "taskName": "Buy groceries",
  "completed": true,
  "completedAt": "2023-08-08T12:00:00Z"
}
```

### DELETE /tasks

Delete all tasks.

Example Request:
```
DELETE http://localhost:5000/tasks
```

Example Response:
```json
{
  "message": "All tasks deleted"
}
```

## Error Handling

If an error occurs, the API will respond with an appropriate error message and status code.

- 404 Not Found: Task not found.
- 500 Internal Server Error: Internal server error.