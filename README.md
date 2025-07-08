# NextJS Auth App

A simple Next.js application with two pages: a login page (`/auth`) and a dashboard page (`/dashboard`). The login page accepts a phone number with validation, fetches user data from the [Random User API](https://randomuser.me/), stores it in `localStorage`, and redirects to the dashboard. The dashboard displays a welcome message with the user's name and phone number. The app uses TypeScript, SCSS with module and nesting support, and the Next.js App Router for a fully responsive, type-safe experience.

## Features

- **Login Page (`/auth`)**:
  - Phone number input with validation (must start with "09" and be 11 digits, e.g., `09123456789`).
  - Custom `InputField` and `Button` components within a reusable `Form` component.
  - Fetches user data from `https://randomuser.me/api/?results=1&nat=us` on form submission.
  - Stores user data (`phoneNumber`, `apiPhone`, `name`, `email`) in `localStorage`.
  - Redirects to `/dashboard` upon successful login.
- **Dashboard Page (`/dashboard`)**:
  - Displays a welcome message with the user's combined name (e.g., "Mr Carter Pearson") and phone number.
  - Redirects to `/auth` if no user data is found in `localStorage`.
- **Responsive Design**:
  - SCSS modules with nesting for modular, maintainable styles.
  - Responsive layouts for desktop, tablet (≤768px), and mobile (≤480px) screens.
- **Type Safety**:
  - TypeScript for all components, utilities, and API data with a `User` interface.
- **Client-Side Authentication**:
  - Checks `localStorage` on page load to enforce authentication redirects.
  - Avoids server-side `localStorage` access to prevent SSR issues.

## Tech Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS (with module and nesting support)
- **API**: Random User API (`https://randomuser.me/api/`)
- **Storage**: Browser `localStorage`
- **Dependencies**:
  - `next`, `react`, `react-dom`, `sass`
  - Dev: `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`, `typescript`

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── page.tsx
│   │   │   ├── auth.module.scss
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── dashboard.module.scss
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.scss
│   ├── components/
│   │   ├── InputField.tsx
│   │   ├── Button.tsx
│   │   ├── Form.tsx
│   ├── types/
│   │   ├── user.ts
│   ├── utils/
│   │   ├── storage.ts
├── public/
├── README.md
├── tsconfig.json
├── package.json
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
   install dependencies
   ```bash
   npm i
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/auth` in your browser.

## Usage

1. **Login Page (`/auth`)**:
   - Enter a valid phone number (e.g., `09123456789`).
   - The form validates that the number starts with "09" and is 11 digits.
   - On submission, the app fetches user data from the Random User API, stores it in `localStorage`, and redirects to `/dashboard`.
   - If the phone number is invalid, an error message appears below the input.

2. **Dashboard Page (`/dashboard`)**:
   - Displays a welcome message with the user's name (e.g., "Mr Carter Pearson") and phone number.
   - If `localStorage` is empty (e.g., after clearing browser data), the page redirects to `/auth`.

3. **Authentication**:
   - The app uses client-side checks via `localStorage` to redirect unauthenticated users to `/auth`.
   - Clear `localStorage` in the browser dev tools (Application > Storage > Local Storage) to test the redirect behavior.

## API Integration

The app fetches user data from the [Random User API](https://randomuser.me/):
- Endpoint: `https://randomuser.me/api/?results=1&nat=us`
- Response fields used:
  - `name.title`, `name.first`, `name.last` (combined into a single `name` string, e.g., "Mr Carter Pearson")
  - `phone` (stored as `apiPhone`)
  - `email`
- The user-entered phone number is stored as `phoneNumber` to avoid overwriting with the API’s phone.

## Development Notes

- **TypeScript**: The `User` interface (`src/types/user.ts`) ensures type safety for `phoneNumber`, `apiPhone`, `name`, and `email`.
- **SCSS Modules**: Styles are scoped to components using `.module.scss` files with nesting for clean, hierarchical CSS.
- **Responsive Design**: Media queries in `auth.module.scss` and `dashboard.module.scss` handle tablet (≤768px) and mobile (≤480px) breakpoints.
- **Error Handling**:
  - Form validation for phone numbers.
  - Fallbacks for missing API fields (e.g., empty `name` or `phone`).
  - Try-catch blocks in `storage.ts` for `localStorage` access.
- **Client-Side Rendering**: The `"use client"` directive in `auth/page.tsx`, `dashboard/page.tsx`, and components ensures `localStorage` and browser APIs are only accessed client-side.

