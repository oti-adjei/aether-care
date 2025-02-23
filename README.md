
# Aethercare API

Aethercare is a healthcare management API. This README provides a quick overview of the API and setup instructions. For detailed documentation, please refer to the [AetherCare Wiki](https://github.com/oti-adjei/aether-care/wiki).

## Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Environments](#environments)
- [Endpoints](#endpoints)
- [Postman Collection](#postman-collection)
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

Create a .env file and include the following:
```
AETHERCARE_NODE_ENV=development
AETHERCARE_PORT=4000
AETHERCARE_DATABASE_URL=
AETHERCARE_API_VERSION=
APP_NAME=AetherCare
AETHERCARE_SALT_ROUNDS=
AETHERCARE_SECRET=
AETHERCARE_DOMAIN=localhost
MNOTIFY_ENDPOINT=
MNOTIFY_API_KEY=
ENCRYPTION_KEY=
LLM_API_KEY=
```
### Authentication

Aethercare API uses token-based authentication. See the Authentication & Security section in the Wiki for details. Replace link-to-wiki-auth-section with the actual anchor link to that section in the Wiki. Each request must include a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Environments

The API supports different environments:

Development: https://api.dev.aethercare.com

Staging: https://api.staging.aethercare.com

Production: https://api.aethercare.com

Endpoints

For a complete list of API endpoints and their details, including request/response examples and authentication requirements, please refer to the API Endpoints section in the Wiki. Replace link-to-wiki-endpoints-section with the actual anchor link to that section in the Wiki.

#### Auth:

- **POST /auth/register**

- **POST /auth/login**

- **POST /auth/logout**

- **POST /auth/refresh**

#### Medical History:

- **GET /medical-history/{patientId}**

- **POST /medical-history**

- **PUT /medical-history/{id}**

#### Doctor Notes:

- **GET /doctor-notes/{doctorId}**

- **POST /doctor-notes**

- **DELETE /doctor-notes/{id}**

#### Patient-Doctor Assignments:

- **POST /assignments**

- **GET /assignments/{patientId}**

#### Actionable Steps:

- **GET /actionable-steps**

- **POST /actionable-steps**

- **DELETE /actionable-steps/{id}**

## Postman Collection
To facilitate API testing, use the **Aethercare Postman Collection**. This collection is pre-configured with environments for 
- **Beta (Development)**
- **Staging**
- **Production**

This allows you to easily switch between different API endpoints.
[View Aethercare Postman](https://www.postman.com/chingu-v47-team28/workspace/aethercare/collection/15310325-5d8dcb60-3116-433d-a840-e04e7abaab20?action=share&creator=15310325&active-environment=15310325-5e31c593-f1a6-4648-be8a-fdf23489fc63)
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

