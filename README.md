# Aethercare API

Aethercare is a healthcare management API that facilitates user management, patient records, medical history, doctor notes, visit logs, and more. This documentation provides an overview of the API, setup instructions, and endpoint details.

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Environments](#environments)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Users](#users)
  - [Doctors](#doctors)
  - [Patients](#patients)
  - [Admins](#admins)
  - [Medical History](#medical-history)
  - [Doctor Notes](#doctor-notes)
  - [Patient-Doctor Assignments](#patient-doctor-assignments)
  - [Visit Logs](#visit-logs)
  - [Actionable Steps](#actionable-steps)
- [Postman Collection](#postman-collection)
- [Checklist](#checklist)
- [License](#license)

## Getting Started
### Prerequisites
- Node.js
- PostgreSQL
- Postman (for testing)
- `.env` file with necessary environment variables

### Installation
```sh
# Clone the repository
git clone https://github.com/your-repo/aethercare.git
cd aethercare

# Install dependencies
npm install

# Run the application
npm run dev
```

### Environment Variables
Create a `.env` file and include the following:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=your_port
```

## Authentication
Aethercare API uses token-based authentication. Each request must include a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Token Expiration & Refresh
- Tokens expire after a set duration (e.g., 24 hours).
- Refresh tokens allow users to obtain a new token without logging in again.

## Environments
The API supports different environments:
- **Development**: `https://api.dev.aethercare.com`
- **Staging**: `https://api.staging.aethercare.com`
- **Production**: `https://api.aethercare.com`

## Endpoints

### Auth
- **POST /auth/register** – Register a new user
- **POST /auth/login** – Authenticate and receive a token
- **POST /auth/logout** – Logout a user
- **POST /auth/refresh** – Refresh authentication token

### Users
- **GET /users** – Fetch all users
- **GET /users/{id}** – Fetch a specific user
- **PUT /users/{id}** – Update user details
- **DELETE /users/{id}** – Soft delete a user
- **POST /users/restore/{id}** – Restore a soft-deleted user

### Doctors
- **GET /doctors** – List all doctors
- **POST /doctors** – Register a new doctor
- **GET /doctors/{id}** – Fetch a specific doctor
- **PUT /doctors/{id}** – Update doctor details

### Patients
- **GET /patients** – List all patients
- **POST /patients** – Register a new patient
- **GET /patients/{id}** – Fetch a specific patient
- **PUT /patients/{id}** – Update patient details

### Admins
- **GET /admins** – List all admins
- **POST /admins** – Register a new admin
- **GET /admins/{id}** – Fetch a specific admin

### Medical History
- **GET /medical-history/{patientId}** – Get medical history for a patient
- **POST /medical-history** – Add medical history entry
- **PUT /medical-history/{id}** – Update medical history

### Doctor Notes
- **GET /doctor-notes/{doctorId}** – Get doctor notes
- **POST /doctor-notes** – Add a note
- **DELETE /doctor-notes/{id}** – Delete a note

### Patient-Doctor Assignments
- **POST /assignments** – Assign a doctor to a patient
- **GET /assignments/{patientId}** – View a patient’s assigned doctor

### Visit Logs
- **GET /visit-logs** – View all visit logs
- **POST /visit-logs** – Create a new visit log
- **GET /visit-logs/{id}** – View a specific visit log

### Actionable Steps
- **GET /actionable-steps** – Get all actionable steps
- **POST /actionable-steps** – Create a new actionable step
- **DELETE /actionable-steps/{id}** – Delete an actionable step

## Postman Collection
To facilitate API testing, use the **Aethercare Postman Collection**:
[Download Aethercare.postman_collection.json](sandbox:/mnt/data/Aethercare.postman_collection.json)
## Checklist

### File Setup
- [x] Create the project structure
- [x] Setup `.env` file and environment variables
- [x] Configure TypeScript and tsconfig
- [x] Install dependencies (Express, Zod, PostgreSQL, etc.)
- [x] Setup database connection and migrations
- [ ] Seed initial data if necessary

### Authentication Module
- [x] Implement Auth Routes (Signup, Login)  <!-- Updated to reflect core requirements -->
- [x] Implement Auth Controller
- [x] Implement Auth Service
- [x] Implement User Repository
- [x] Implement Query Layer for Auth
- [ ] Implement Token Expiry & Refresh Mechanism
- [ ] Write tests for Auth routes

### User Module
- [x] Implement User Routes
- [x] Implement User Controller
- [x] Implement User Service
- [x] Implement User Repository
- [x] Implement Query Layer for Users
- [ ] Write tests for User routes

### Doctors Module
- [x] Implement Routes
- [x] Implement Controllers
- [x] Implement Services
- [x] Implement Repositories
- [x] Implement Query Layers
- [ ] Write Tests for all Routes

### Patient Module
- [x] Implement Routes
- [x] Implement Controllers
- [x] Implement Services
- [x] Implement Repositories
- [x] Implement Query Layers
- [ ] Write Tests for all Routes

### Patient-Doctor Assignment Module
- [x] Implement Routes
- [x] Implement Controllers
- [x] Implement Services
- [x] Implement Repositories
- [x] Implement Query Layers
- [ ] Implement Logic for Patient Doctor Selection
- [ ] Doctors can see a list of patients who have selected them.
- [ ] Write Tests for all Routes

### Doctor Notes Module
- [x] Implement Routes
- [x] Implement Controllers
- [x] Implement Services
- [x] Implement Repositories
- [x] Implement Query Layers
- [ ] Implement Note Submission logic
- [ ] **Implement End-to-End Encryption for Doctor Notes (Client-Side)**  <!-- NEW -->
    - [ ]  Generate Encryption Keys per Note (or User, depending on strategy)
    - [ ]  Encrypt Note Content Before Sending to Backend
    - [ ]  Securely Store/Manage Encryption Keys (Consider Key Rotation)
    - [ ]  Decryption Logic on Client-Side (Doctor/Patient)
- [ ] Write Tests for all Routes

### Actionable Steps Module
- [x] Implement Routes
- [x] Implement Controllers
- [x] Implement Services
- [x] Implement Repositories
- [x] Implement Query Layers
- [ ] Implement logic for retrieving actionable steps and reminders
- [ ] Write Tests for all Routes

### LLM Integration & Dynamic Scheduling
- [ ] **Implement LLM Integration Service** <!-- NEW -->
    - [ ]  Connect to Live LLM (e.g., Google Gemini Flash)
    - [ ]  Implement Function to Extract Checklist and Plan from Doctor Notes
    - [ ] Handle LLM API Key Management Securely
- [ ] **Implement Dynamic Scheduling Service** <!-- NEW -->
    - [ ]  Schedule Reminders Based on LLM-Extracted Plan
    - [ ]  Store Reminder Details (Patient ID, Task, Schedule)
    - [ ]  Implement Logic to Handle Missed Check-ins (Extend Reminders)
    - [ ]  Implement Logic to Cancel Existing Actionable Steps on New Note Submission
- [ ] Implement Logic for retrieving actionable steps and reminders

### API Endpoints
- [ ] **Implement Patient Doctor Selection Endpoint**
- [ ] **Implement Doctor Retrieval of Patient List Endpoint**
- [ ] **Implement Doctor Notes Submission Endpoint (with LLM Processing)**
- [ ] **Implement Actionable Steps Retrieval Endpoint**

### Security
- [ ]  **Review and Harden API Endpoints against Common Vulnerabilities (OWASP Top 10)**
- [ ]  Implement Rate Limiting to Prevent Abuse
- [ ]  Audit Logging of Sensitive Actions

### Final Steps
- [ ] Verify API endpoints with Postman
- [x] Check database queries and migrations
- [ ] Deploy and test in staging environment
- [ ] Final review and documentation updates
- [ ] **Write Integration Tests to Verify End-to-End Flow (Signup -> Note Submission -> Actionable Steps)** <!-- NEW -->
## License
Aethercare API is open-source and available under the MIT License.

