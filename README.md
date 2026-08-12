# Vaultly

Vaultly is a sleek, modern subscription management web application built with React, TypeScript, and Vite. It helps users track, manage, and organize their recurring subscriptions in a beautiful, glassmorphic dark-themed interface.

## 🌟 Features

- **Authentication:** Secure Sign Up, Login, and OTP Verification powered by Supabase Auth.
- **Profile Management:** Update account details and upload/remove profile avatars (using Supabase Storage).
- **Security First:** Includes a robust Account Deletion flow with secure PostgreSQL RPC functions and RLS policies.
- **Subscription Tracking:** Add, edit, and view all your recurring subscriptions (WIP).
- **Beautiful UI:** 
  - Dark mode with glassmorphism effects.
  - Fully responsive design using Tailwind CSS v4.
  - Accessible and animated toast notifications via [Sonner](https://sonner.emilkowal.ski/).
  - Premium icons from [Hugeicons](https://hugeicons.com/).

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 + tailwind-merge
- **Backend & Auth:** Supabase
- **Routing:** React Router v7
- **Notifications:** Sonner
- **Icons:** React Icons & Hugeicons

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bimal-sunil/Vaultly.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Vaultly
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root of your project and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running Locally
To start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## 📁 Project Structure

- `src/components/` - Reusable UI components (Buttons, Inputs, Popups, Toasts).
- `src/context/` - Global React Context (e.g., `AuthContext.tsx` for global user state).
- `src/pages/` - Main route components (Login, Profile, AccountDetails, Subscriptions).
- `src/utils/` - Utility functions and Supabase client configuration.

## 📝 License
This project is open-source and available under the MIT License.
