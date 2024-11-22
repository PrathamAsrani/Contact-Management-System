# Contact Management System for Erino

This is a contact management system designed for managing user information and contacts. It follows a three-tier architecture: Database, Backend, and Frontend.

## Table of Contents

- Technologies Used
- Low-Level Design
- Functionality
- Features

## Setup Instructions

### Backend:
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Run the backend server:
   - With `nodemon` (for development):
     ```bash
     npm test
     ```
   - Or using `node`:
     ```bash
     node Server.js
     ```
   - Or start with npm:
     ```bash
     npm start
     ```

### Frontend:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```

## Low-Level Design

The system is designed in a three-tier architecture:

### Level 1: Database

**Technologies**: PostgreSQL

**Why PostgreSQL?**
- PostgreSQL is a relational database that supports fixed-field data storage and implements ACID properties for handling simultaneous transactions.
- It is widely used in the industry and aligns with the requirements of this system.

### Level 2: Backend

**Technologies**: Node.js, Express.js

- The backend is a REST API created using Express.js.
- It follows SOLID principles for flexibility and ease of adding new routes or modifying existing functionality.
- Routes for user and contact management are defined in separate controller files, ensuring modularity and clarity.

### Level 3: Frontend

**Technologies**: React.js, ContextAPI, localStorage

- **React.js**: For building the user interface.
- **ContextAPI**: Used for global state management, storing user data (like `user_id`) and page data (like how many records to fetch).
- **localStorage**: Used to store authentication tokens, ensuring the user remains signed in even after page reloads.

## Functionality

### User:
1. Sign up
2. Sign in
3. Delete user

### Contact:
1. Add contact
2. Delete contact
3. Edit contact
4. Update contact

## Features

1. **Readable**: The code is written in a clean and well-structured format.
2. **Understandable**: Comments are provided for better clarity.
3. **Resource Sharing**: CORS is enabled, allowing resource sharing with other websites.
4. **Maintainable**: Follows the single responsibility principle to make maintenance easier.
5. **Extensible**: Adheres to the open-closed principle for easy extension of functionality.
6. **Secure**: Provides protection against DDoS attacks, with additional security features enabled using `helmet` in Node.js.
