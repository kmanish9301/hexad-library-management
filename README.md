# React + TypeScript + Vite

# 📚 Library Management Frontend

A single-page **frontend-only** Library Management application built with **React (Vite)** and **TypeScript**, styled using **Material UI**, and tested with **Vitest + React Testing Library**.

This project implements all the user stories from the **Hexad Fullstack Coding Challenge**, focusing on the **frontend** part only.

---

## 🚀 Features Implemented

✅ View available books in the library  
✅ Borrow a book (reduces available copies)  
✅ Borrow a copy of a book when multiple copies exist  
✅ Borrowing limit of maximum **2 books per user**  
✅ Return borrowed books (restores library copies)  
✅ Clean, responsive UI using **Material UI**  
✅ Unit & integration tests using **Vitest**  
✅ Strongly typed code with TypeScript  
✅ Context + Reducer pattern for predictable state management  
✅ Code follows SOLID, DRY, and clean architecture guidelines  

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [React 18 + Vite](https://vitejs.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI Library | [Material UI (MUI v6)](https://mui.com/) |
| State Management | React Context + useReducer |
| Testing | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| Package Manager | npm |
| Linting / Formatting | ESLint + Prettier |

---

2️⃣ Start Development Server
npm run dev


Open your browser → http://localhost:5173

3️⃣ Run Tests
npm run test


Uses Vitest + React Testing Library for unit & integration tests.

4️⃣ Build for Production
npm run build
npm run preview

🧪 Test Coverage
Covered Scenarios:

✅ Fetch and render books from mock API

✅ Borrow a book and display it in the “Borrowed” list

✅ Prevent borrowing the same book twice

✅ Prevent borrowing more than 2 books

✅ Return a book and restore its availability

✅ Show empty state messages for both lists

All tests follow Testing Library best practices (findBy*, queryBy*, waitFor) ensuring accessible and stable selectors.

```
