## ✅ Tech Stack Overview

| **Tech**                       | **Purpose**                                          |
| ------------------------------ | ---------------------------------------------------- |
| React + TypeScript             | UI and type safety                                   |
| Clean Architecture             | Maintainable domain-driven structure                 |
| ShadCN UI + Tailwind           | Modern UI with custom theming                        |
| TanStack Query                 | Data fetching/caching (backend interaction)          |
| TanStack Table                 | Powerful table management (sorting, filtering, etc.) |
| Redux (optional)               | Global state (e.g. auth, theme)                      |
| ESLint + Prettier              | Code quality and formatting                          |
| Husky + Lint Staged            | Git hooks for quality enforcement                    |
| Vitest + React Testing Library | Unit + Integration Testing                           |
| Docker                         | App containerization                                 |
| GitHub Actions                 | CI: lint/test/build/check PRs                        |

---

## 🧱 Folder Structure

```
src/
├── core/
│   ├── di/
│   ├── theme/
│   ├── error/
│   └── utils/
├── features/
│   └── todos/
│       ├── data/
│       ├── domain/
│       └── presentation/
│           ├── view/
│           └── viewModel/
├── data/
│   ├── dataSource/
│   │   ├── remote/
│   │   └── local/
│   ├── models/
│   └── repository/
├── domain/
│   ├── entities/
│   └── usecases/
├── app/
│   ├── store/ (Redux)
│   └── router/
├── components/ (shared UI like buttons, cards)
├── services/ (e.g., token manager, notification)
└── main.tsx
```
