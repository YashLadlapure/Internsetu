# InternSetu

Internship discovery platform for college students. Started as a hackathon project and I've been extending it since.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)

---

## What it does

Students can browse internship listings, build a profile, and track applications in one place. The backend scrapes listings from multiple sources and stores them in a PostgreSQL database. Auth is handled with secure session management.

---

## Tech

| Layer | Stack |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Node.js, REST APIs |
| Database | PostgreSQL |
| DevOps | Docker, Vercel |

---

## Running locally

```bash
git clone https://github.com/YashLadlapure/Internsetu.git
cd Internsetu
npm install
cp .env.example .env
docker-compose up
```

Or without Docker: `npm run dev`

---

## Structure

```
Internsetu/
├── app/
├── components/
├── lib/
├── prisma/
└── public/
```
