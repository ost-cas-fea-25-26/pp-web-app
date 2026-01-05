# PP Web App

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=putt-and-push_pp-web-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=putt-and-push_pp-web-app)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=putt-and-push_pp-web-app&metric=coverage)](https://sonarcloud.io/summary/new_code?id=putt-and-push_pp-web-app)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=putt-and-push_pp-web-app&metric=bugs)](https://sonarcloud.io/summary/new_code?id=putt-and-push_pp-web-app)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=putt-and-push_pp-web-app&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=putt-and-push_pp-web-app)
[![CI](https://github.com/ost-cas-fea-25-26/pp-web-app/actions/workflows/ci.yaml/badge.svg)](https://github.com/ost-cas-fea-25-26/pp-web-app/actions)
[![Vercel Deploy](https://img.shields.io/badge/vercel-live-000?logo=vercel)](https://pp-web-app.vercel.app)
![Node version](https://img.shields.io/badge/node-%5E22-blue)
![types](https://img.shields.io/badge/types-TypeScript-blue)
![code style](https://img.shields.io/badge/code_style-prettier-ff69b4)
![lint](https://img.shields.io/badge/lint-eslint-blue)
![E2E](https://img.shields.io/badge/e2e-playwright-green)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## 🚀 Overview

**PP Web App** is the main Next.js application of the Put & Push platform.
It consumes the **PP Design System**, integrates authentication, database access, and APIs, and represents the production-ready web frontend.

The app is built with scalability, type safety, and automation in mind, featuring a fully automated CI/CD pipeline and comprehensive test coverage.

---

## 🌐 Production

**Live Application:**  
https://pp-web-app.vercel.app

Deployed automatically via **Vercel** on every main branch update.

---

## ✨ Features

- Next.js App Router with React 19
- TypeScript-first architecture
- Shared UI via PP Design System
- Authentication with Better Auth
- PostgreSQL database via Neon + Drizzle ORM
- API client generated from OpenAPI
- Unit, integration, and E2E tests
- Visual and functional E2E testing with Playwright
- Fully automated CI with GitHub Actions
- Code quality and coverage tracked via SonarCloud

---

## 🧩 Tech Stack

| Area           | Tool / Library           |
| -------------- | ------------------------ |
| Framework      | Next.js (Turbopack)      |
| UI             | React + PP Design System |
| Styling        | Tailwind CSS             |
| Authentication | Better Auth              |
| Database       | PostgreSQL (Neon)        |
| ORM            | Drizzle ORM              |
| API Client     | OpenAPI TypeScript       |
| Unit Tests     | Vitest                   |
| E2E Tests      | Playwright               |
| Linting        | ESLint + Knip            |
| Formatting     | Prettier                 |
| CI/CD          | GitHub Actions           |
| Hosting        | Vercel                   |

---

## 📦 Installation

```bash
npm install
```

Create a `.env` file and configure the required environment variables (database, auth, API, etc.).

---

## 🛠️ Development

### Start Development Server

```bash
npm run dev
```

Runs the Next.js app with Turbopack and prepares the database automatically.

---

## 🗄️ Database

Start local database and run migrations:

```bash
npm run db:up
npm run db:migrate
```

Generate schema artifacts:

```bash
npm run db:generate
```

---

## 🔐 Authentication

Authentication is handled via **Better Auth**, providing a secure and extensible auth setup for the application.

---

## 🧪 Testing

### Unit Tests

```bash
npm run test:unit
npm run test:unit:coverage
```

### End-to-End Tests

```bash
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:debug
```

View Playwright reports:

```bash
npm run test:e2e:report
```

---

## 🧹 Code Quality

Run all quality checks:

```bash
npm run lint
```

Auto-fix issues:

```bash
npm run lint:fix
```

Unused code detection:

```bash
npm run check:unused
```

---

## 🔄 Design System Development

To link the local PP Design System build:

```bash
npm run design-system:link
```

---

## 📚 References

- https://nextjs.org/
- https://react.dev/
- https://tailwindcss.com/
- https://orm.drizzle.team/
- https://neon.tech/
- https://playwright.dev/
- https://vitest.dev/
- https://sonarcloud.io/
- https://vercel.com/

---

Made with ❤️ for Put & Push.
