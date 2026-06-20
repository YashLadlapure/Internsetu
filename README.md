# 🔗 InternSetu

> An internship discovery and application platform built for college students — centralized, student-focused, and recruiter-ready.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)

---

## 🚀 Live Demo

> Deployed on Vercel — [View Live](https://internsetu.vercel.app) *(Coming Soon)*

---

## 🧩 Problem Statement

College students lack a centralized, student-focused platform to discover, track, and apply for internships efficiently. Existing platforms are either too generic or cluttered with unrelated job listings.

---

## ✨ Features

- 🔍 Scrapes and aggregates internship listings from multiple sources
- 📝 Student profile & application tracking dashboard
- 🔐 Authentication with secure session management
- 📊 PostgreSQL-backed scalable data model
- 🐳 Dockerized for consistent local & production environments
- 📱 Responsive Next.js frontend

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Node.js, REST APIs |
| Database | PostgreSQL |
| DevOps | Docker, Vercel |

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/YashLadlapure/Internsetu.git
cd Internsetu

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in DATABASE_URL and other required vars

# Run with Docker (recommended)
docker-compose up

# OR run without Docker
npm run dev
```

---

## 📁 Project Structure

```
Internsetu/
├── app/          # Next.js app directory
├── components/   # Reusable UI components
├── lib/          # DB helpers, API utils
├── prisma/       # Database schema
└── public/       # Static assets
```

---

## 🤝 Contributing

PRs welcome! Please open an issue first to discuss proposed changes.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add feature'`
4. Push and open a PR

---

## 👤 Author

**Yash Ladlapure** — [GitHub](https://github.com/YashLadlapure) · [LinkedIn](https://www.linkedin.com/in/yash-ladlapure) · [Portfolio](https://yashladlapure.github.io/portfolio-website/)
