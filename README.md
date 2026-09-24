# Nuxt Full-Stack Login Demo

Author: PT PJPT

This Nuxt 3 TypeScript application demonstrates a small full-stack authentication flow for the test assignment. Yup validates form input in the browser, Zod validates the API request on the server, and H3 Session stores the authenticated user's identity and role in a protected cookie-backed session. Admin users can access `/admin`, while employees are redirected to `/home` by server middleware.

## Demo credentials

| Username | Password | Role |
| --- | --- | --- |
| `admin` | `admin` | Admin |
| `employee` | `employee` | Employee |

## Running the application

Requirements: Node.js 18 or newer and npm.

```bash
npm install
```

The session needs a secret with at least 32 characters. In PowerShell:

```powershell
$env:NUXT_SESSION_PASSWORD = "replace-with-a-random-value-at-least-32-characters-long"
npm run dev
```

Open `http://localhost:3000`. The application starts at the login page. Available commands:

```bash
npm run dev       # Start the development server
npm run build     # Build for production
npm run preview   # Preview the production build
```

For production, configure `NUXT_SESSION_PASSWORD` as a deployment secret. Do not commit it to source control.

## Folder structure

```text
src/
	app.vue                    # Root Nuxt application shell
	app.config.ts              # Nuxt UI application configuration
	assets/css/main.css        # Shared visual styles
	middleware/auth.global.ts  # Client route guard for login state
	pages/
		login.vue                # Yup form validation and login UI
		home.vue                 # Authenticated landing page
		admin.vue                # Admin-only page
	server/
		api/                     # Login, logout, and current-user endpoints
		middleware/auth.ts       # Server-side authorization for /admin
		repositories/user.ts     # Static demo user data and lookup
		utils/session.ts         # Shared H3 session configuration
		tsconfig.json            # Server TypeScript configuration
public/                      # Static files served as-is
nuxt.config.ts               # Nuxt modules and runtime configuration
tailwind.config.ts           # Tailwind configuration
package.json                 # Scripts and dependencies
```

The `pages` directory owns the user-facing routes, while `middleware` protects navigation before a page is entered. Server-only code stays under `server` so validation, session access, and authorization are not exposed as client implementation details. The repository is deliberately isolated from the API handlers so the static data source can later be replaced by a database without changing the route contract.

## Why H3 Session?

H3 Session fits Nuxt's server runtime and provides a small API for reading and updating session data from event handlers. The application can keep only the username and role in the session, use an HTTP-only cookie rather than browser-managed authentication state, and share the same session configuration across `/api/login`, `/api/me`, `/api/logout`, and authorization middleware.

## Edge cases handled

- Invalid or incomplete input shows the first Yup validation message without sending a request.
- Invalid credentials return a clear `Invalid credentials` message from the server.
- The submit button shows a loading state and is disabled while the request is running; repeated submits are guarded as well.
- An unauthenticated user attempting `/home` or `/admin` is redirected to `/login`.
- An authenticated user attempting `/login` is redirected to `/home`.
- An employee attempting `/admin` is redirected to `/home` by server middleware, so the permission check is not dependent only on client navigation.
- The session configuration fails fast when `NUXT_SESSION_PASSWORD` is missing.

## Security notes

This is a deliberately small test implementation with static demo credentials. In a real application, passwords must never be stored or compared as plain text; they should be hashed with a suitable password-hashing algorithm such as bcrypt. A production session should also have an explicit expiry, secure cookie settings, rotation and invalidation policies, and a persistent user store. The session password must be a strong secret supplied through environment configuration.

## StackBlitz

This repository does not have a published StackBlitz URL yet. To run it there, import the repository at [StackBlitz](https://stackblitz.com/), configure `NUXT_SESSION_PASSWORD` in the environment, and start the Nuxt development server. Once published, the generated project URL can be added here.

## Implementation summary

The requested Nuxt TypeScript login flow is complete: Yup handles client validation, Zod handles server validation, H3 Session tracks authentication, route guards protect navigation, and server middleware enforces the admin permission. The main assumption is that static users and local development credentials are acceptable for this test scope. With more time, I would add a database-backed user repository, hashed passwords, expiring sessions, automated end-to-end tests, and a published StackBlitz demo.
