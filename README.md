# Nuxt Full-Stack Login Demo 
**Technical Test for IT Implementation**

**Author:** Leo Saputra Marhadi

This Nuxt 3 TypeScript application demonstrates a full-stack authentication flow. It showcases strict separation of concerns, Role-Based Access Control (RBAC), and layered validation, ensuring both functional stability and system security.

## 🚀 Live Demo
The application is deployed and can be tested directly via StackBlitz:
👉 **[Run on StackBlitz](https://stackblitz.com/github/Xierra19/nuxt-test)**

### Demo Credentials
| Username | Password | Role | Expected Behavior |
| --- | --- | --- | --- |
| `admin` | `admin` | Admin | Redirected to `/home`, can access `/admin` |
| `employee` | `employee` | Employee | Redirected to `/home`, blocked from `/admin` |

---

## 🔐 Business Process & System Flow
To ensure the authentication flow aligns with business requirements, below is the system sequence diagram illustrating the login and authorization process:
<img width="2832" height="4756" alt="image" src="https://github.com/user-attachments/assets/8cc00df2-b2f3-4691-8b8c-f090df56bcd4" />

```mermaid
sequenceDiagram
    actor User
    participant Client (Nuxt UI)
    participant Server (H3 API)
    
    User->>Client: Input Username & Password
    Note over Client: Yup Validation (Client-side)
    alt Invalid Input
        Client-->>User: Show Error (e.g., "Must be at least 4 characters")
    else Valid Input
        Client->>Server: POST /api/login
        Note over Server: Zod Validation (Server-side)
        alt Invalid Payload
            Server-->>Client: 400 Bad Request
        else Valid Payload
            Server->>Server: Check Credentials (Repository)
            alt User Not Found
                Server-->>Client: 401 Unauthorized (Invalid credentials)
            else User Found
                Server->>Server: Create H3 Session
                Server-->>Client: 200 OK (Success)
                Client->>User: Redirect to /home
            end
        end
    end

🧪 QA & System Testing Strategy
To guarantee all requirements are met and edge cases are handled, a comprehensive Functional & Security Testing phase was executed.

The detailed Test Cases, including SIT (System Integration Testing) scenarios for Server Middleware and UI validation, can be found here:
https://docs.google.com/spreadsheets/d/1r8QOeuKvCEP9KLjV71US2pY4JcgGNXfEVyHBSVgNVh4/edit?usp=sharing

Key Edge Cases Handled:
1. Invalid or incomplete inputs trigger instant client-side Yup validation without hitting the server.
2. Unauthenticated users attempting to access /home or /admin are forcefully redirected to /login.
3. Authenticated users attempting to visit /login are seamlessly redirected to /home.
4.Role-Based Server Middleware: An employee attempting to force-navigate to /admin via the address bar is blocked by the server and redirected to /home.

🏗️ Architecture & Development Setup
System Architecture
1. Client-Side: Nuxt 3, NuxtUI (Tailwind CSS), and Yup for real-time form validation.
2. Server-Side: H3 endpoints, Zod for strict payload parsing, and H3 Sessions (HTTP-only cookies) for secure, stateless-like session management.
3. Data Layer: A decoupled repository pattern (src/server/repositories/user.ts) is used to mock database interactions, making it highly scalable for future DBMS integration.

Local Installation
Requirements: Node.js 18+ and npm.

# 1. Install dependencies
npm install

# 2. Set up a secure session password (at least 32 characters)
# For Windows (PowerShell):
$env:NUXT_SESSION_PASSWORD = "replace-with-a-random-value-at-least-32-characters-long"

# For Mac/Linux:
export NUXT_SESSION_PASSWORD="replace-with-a-random-value-at-least-32-characters-long"

# 3. Start the development server
npm run dev
Open http://localhost:3000 to view the application.
