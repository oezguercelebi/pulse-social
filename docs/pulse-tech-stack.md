# Pulse Technology Stack

## Core Stack
- **Frontend Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI & Radix Themes
- **Backend/Database**: Supabase

## Optimized Configuration

### Next.js Setup
- Use App Router with React Server Components
- Implement route segmentation for code splitting
- Leverage server actions for form submissions
- Utilize streaming for initial page load performance

### UI Components
- Radix Themes for a complete, accessible design system
- Radix UI primitives for customizable components
- Tailwind CSS for additional styling customization
- Create a minimal component library focused on core needs
- Prioritize reusable, composable components

### Supabase Integration
- Server-side Supabase client for data fetching
- Leverage Row Level Security (RLS) for data protection
- Use Postgres views for complex queries
- Enable realtime subscriptions only for critical features

### State Management
- React Context + Hooks for global state
- Server components for server-side state
- Form state with react-hook-form + zod

## Performance Optimizations

### Server Components
```typescript
// In a Server Component
import { createServerClient } from '@supabase/ssr'

async function Timeline() {
  const supabase = createServerClient(...)
  const { data } = await supabase.from('timeline').select('*').limit(20)
  return <PostList posts={data} />
}
```

### Image Optimization
- Next.js Image component with proper sizing
- Supabase storage with CDN caching
- Progressive image loading for timeline

### Bundle Size
- Implement component-level code splitting
- Use dynamic imports for non-critical components
- Minimal external dependencies

## Minimal Project Structure
```
src/
├── app/ (Next.js App Router routes)
├── components/ 
│   ├── ui/ (Radix + Tailwind components)
│   └── features/ (feature-specific components)
├── lib/ (utilities and Supabase client)
└── types/ (TypeScript definitions)
```

## Essential Packages
- **Core**: next, react, typescript
- **UI**: @radix-ui/react-*, tailwindcss, class-variance-authority
- **Supabase**: @supabase/supabase-js, @supabase/ssr
- **Forms**: react-hook-form, zod
- **Utilities**: date-fns (lightweight date handling)

## Development Practices
- TypeScript strict mode
- Implement component-driven development
- Use Edge runtime for global performance
- Regularly audit bundle size
- Continuously test on mobile devices
