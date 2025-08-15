# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern 3D portfolio website built with React, TypeScript, Three.js, and Tailwind CSS. The site features interactive 3D models, smooth animations with Framer Motion, and a responsive design.

## Development Commands

```bash
# Install dependencies (use legacy peer deps flag)
npm install --legacy-peer-deps

# Start development server
npm run dev

# Start development server with network access
npm run dev-vp

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check-types

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber and Drei
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Email Service**: EmailJS for contact form

### Project Structure
- `/src/components/` - React components organized by feature
  - `canvas/` - Three.js 3D components (Ball, Computers, Earth, Stars)
  - Individual section components (Hero, About, Experience, Tech, Works, Contact)
- `/src/constants/` - Application constants and configuration data
- `/src/hoc/` - Higher-order components (SectionWrapper)
- `/src/utils/` - Utility functions for animations and helpers
- `/src/assets/` - Static assets organized by type
  - `tech/` - Technology icons
  - `projects/` - Project images
  - `company/` - Company logos
  - `socials/` - Social media icons
- `/public/` - 3D models and textures
  - `desktop_pc/` - Desktop computer 3D model
  - `planet/` - Planet 3D model

### Key Components Flow
1. **App.tsx** - Main application container with routing
2. **Section Components** - Each major section (Hero, About, etc.) is wrapped with SectionWrapper HOC
3. **3D Components** - Canvas components render Three.js scenes
4. **Project Modal** - Interactive modal for displaying project details

### State Management
- Local component state with React hooks
- No global state management library

### Environment Variables
Required `.env` file for EmailJS integration:
```
VITE_APP_SERVICE_ID=
VITE_APP_TEMPLATE_ID=
VITE_APP_EMAILJS_KEY=
VITE_APP_EMAILJS_RECIEVER=
```

### Build Configuration
- **Vite** configured with React plugin
- Code splitting for vendor, Three.js, and animation libraries
- TypeScript with strict mode enabled
- Tailwind CSS with PostCSS processing

### TypeScript Configuration
- Target: ES6
- Strict mode enabled
- Module resolution: bundler
- JSX: preserve

## Important Notes

- Always use `npm install --legacy-peer-deps` due to peer dependency conflicts
- 3D models are stored in `/public` directory with GLTF format
- Project uses custom Tailwind configuration with extended theme
- Contact form requires EmailJS credentials to function
- Blog section uses Framer Motion's useScroll for horizontal scrolling
- Project modal supports multiple project showcase with blur backdrop

## Git Commit Guidelines

- Use concise commit messages without author references
- Format: `type: brief description`
- No need for Claude Code attribution or co-author lines