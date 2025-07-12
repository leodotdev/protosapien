# Project: Protosapien

## UI Framework: 9ui

This project uses 9ui (https://www.9ui.dev/) - a modern React component library built on top of shadcn/ui.

### Key Information

- **Documentation**: https://www.9ui.dev/docs/getting-started/introduction
- **Component Library**: Built on shadcn/ui architecture
- **Styling**: Uses Tailwind CSS with CSS variables
- **Icons**: Lucide React icons
- **Utilities**: class-variance-authority (cva) and clsx with tailwind-merge

### Project Structure

- Components are stored in `@/components/ui/`
- Utility functions in `@/lib/utils.ts`
- Global styles in `app/globals.css`
- Configuration in `components.json`

### Installation Commands

When adding new 9ui components, use:
```bash
pnpm dlx shadcn@latest add https://9ui.dev/r/[component-name].json
```

Example:
```bash
pnpm dlx shadcn@latest add https://9ui.dev/r/card.json
```

### Development Heuristics

1. **Component Usage**
   - Always check 9ui documentation before implementing custom components
   - Prefer using 9ui components over custom implementations
   - Components follow the shadcn/ui pattern with customizable variants

2. **Styling Guidelines**
   - Use the `cn()` utility function from `@/lib/utils` for combining classes
   - Leverage CSS variables defined in globals.css for theming
   - Follow the existing color scheme using Tailwind's neutral palette

3. **Code Conventions**
   - Components should be typed with TypeScript
   - Use React Server Components (RSC) where possible
   - Follow the existing file naming convention (kebab-case)

4. **Testing & Validation**
   - Run `npm run lint` before completing tasks
   - Ensure TypeScript compilation passes
   - Test components in both light and dark modes if applicable

5. **Common 9ui Components**
   - Button, Card, Input, Dialog, Sheet, Toast
   - Form components with react-hook-form integration
   - Data display components (Table, List, etc.)

### Important Notes

- This project uses Next.js 15 with React 19
- Turbopack is enabled for faster development builds
- **Package Manager**: Always use `pnpm` for all package installations
- **Icons**: 
  - Large icons: Lucide React (already configured)
  - Small icons: Tabler Icons (https://github.com/tabler/tabler-icons)
- **Fonts**: Custom Helvetica Now Display and PP Supply Mono fonts in `/public/fonts/`