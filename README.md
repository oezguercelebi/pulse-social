# Pulse Social

A minimalist social platform where users can share short-form thoughts and updates with their followers in real-time. The platform focuses on simplicity, speed, and meaningful connections.

## Tech Stack

- **Frontend Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Radix Themes
- **Backend/Database**: Supabase

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.local.example` and add your Supabase credentials
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/ (Next.js App Router routes)
├── components/ 
│   ├── ui/ (Radix + Tailwind components)
│   └── features/ (feature-specific components)
├── lib/ (utilities and Supabase client)
└── types/ (TypeScript definitions)
```

## Documentation

For detailed documentation on requirements and technical details, see the `docs` folder:
- [Product Requirements Document](docs/pulse-prd.md)
- [Technology Stack](docs/pulse-tech-stack.md)
- [Implementation TODO List](docs/pulse-todo-list.md) 