# Storybook App

This directory contains the Storybook configuration for the Projects design system. It serves as a development environment for UI components, allowing you to browse a component library, view different states of each component, and interactively test components.

## Setup

### Prerequisites

- Node.js
- pnpm (Package Manager)
- Turbo (Build System)

### Installation

1. From the root directory, install dependencies:

```bash
pnpm install
```

2. Start Storybook development server:

```bash
pnpm dev
```

## Project Structure

```
apps/storybook/
├── .storybook/        # Storybook configuration
├── src/               # Source files
    ├── components/    # UI components
    |-- stories/       # Storybook stories
    ├── styles/        # Global styles
    ├── utils/         # Utility functions
    ├── constants/     # Global constants
├── stories/           # Storybook stories
├── tsconfig.json      # TypeScript configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## Configuration

### TypeScript

The project uses a custom TypeScript configuration extending from `@projects/tsconfig/base.json` with specific settings for DOM and Next.js support.

### Tailwind CSS

Tailwind is configured to:

- Extend the base configuration from `@projects/tailwind-config/web`
- Include UI components from `packages/ui`
- Use custom Geist font families

## Available Scripts

Based on the Turbo configuration:

- `pnpm build` - Build the Storybook static files
- `pnpm dev` - Start development server
- `pnpm lint` - Run linting
- `pnpm typecheck` - Run type checking
- `pnpm clean` - Clean build artifacts

## Dependencies

The Storybook app is integrated with:

- Tailwind CSS for styling
- TypeScript for type safety
- Turbo for build system optimization
- Custom UI component library from `packages/ui`

## Contributing

When adding new stories, ensure they're placed in the `stories/` directory and follow the existing naming conventions.
