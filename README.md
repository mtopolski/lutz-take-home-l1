# Task Dashboard Take-Home Assessment

## Overview

A simplified task management dashboard. The codebase has two components:

- **`task-service/`** - .NET REST API with an in-memory task store
- **`task-dashboard/`** - Next.js frontend

---

## Getting Started

### Task Service

Requires the [.NET SDK](https://dotnet.microsoft.com/download) (v9 or later).

```bash
cd task-service/src/TaskService.Api
dotnet run
```

API available at `http://localhost:5000`.  
Swagger UI at `http://localhost:5000/swagger`.

> Restarting the API resets all task state back to the seed data.

### Task Dashboard

Requires [Node.js](https://nodejs.org) (v18 or later).

```bash
cd task-dashboard
npm install
npm run dev
```

Dashboard available at `http://localhost:3000`.

---

## What Exists

The dashboard shows tasks across three tabs: **In Progress**, **Completed**, and **Archived**, with actions available on active tasks.

---

## Your Tasks

### 1. Fix the archive bug

Archiving a task doesn't behave correctly. The API returns 200, but the UI doesn't reflect the change. Find and fix it.

### 2. Add a confirmation dialog

The product owner wants a confirmation step before a task is archived. The user should be prompted to confirm before the action fires.

### Bonus

If you have time, improve anything about the experience that you think could be better. There's no right answer here, use it to show us how you think.

---

Before writing new code, have a look at what's already in the codebase. There are existing components and patterns worth reusing.

---

## What We're Looking For

- **Pattern recognition** - does the implementation follow the conventions already in the codebase?
- **UX polish** - loading states, disabled buttons during in-flight requests
- **Clean code** - readable, no unnecessary complexity

---

## Notes

- No authentication. The frontend calls `http://localhost:5000` directly
- Task state is held in memory; restarting `dotnet run` resets it
- You may install additional packages if you need them, but the existing setup should be sufficient
- The React Query DevTools (bottom-right corner) may be useful for debugging

---

## Submission

1. Fork this repository
2. Make your changes on a branch
3. Open a pull request against the source repo
