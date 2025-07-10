# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Docker Commands

**Development:**
- `docker-compose --profile dev up` - Start development server in Docker container
- `docker-compose --profile dev down` - Stop development container

**Production:**
- `docker-compose up -d` - Start production container (available at http://localhost:3000)
- `docker-compose --profile prod up -d` - Start production container (available at http://localhost:8080)
- `docker-compose down` - Stop production container
- `docker-compose build` - Build Docker image
- `curl http://localhost:3000/health` - Health check endpoint

## Project Architecture

This is a React + TypeScript Eisenhower Matrix application built with Vite for task prioritization and management. The app is completely in Japanese and uses a drag-and-drop interface to organize tasks by urgency and importance.

### Core Architecture

**Frontend Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- Tailwind CSS for styling
- Lucide React for icons

**Project Structure:**
- `src/app/` - Application entry point and main components
  - `App.tsx` - Main application component with drag-and-drop logic
  - `main.tsx` - Application entry point
- `src/features/tasks/` - Task management feature
  - `components/` - QuadrantCard, TaskCard components
  - `hooks/` - useTasks hook for task state management
  - `types/` - Task and Quadrant type definitions
  - `data/` - Static configuration for quadrants
  - `api/` - API calls for task management (future)
- `src/shared/` - Shared utilities and components
  - `components/ui/` - Reusable UI components
  - `hooks/` - Shared custom hooks
  - `types/` - Common type definitions
  - `api/` - API utilities and configurations

### Key Components

**Task Management:**
- Tasks are managed through `useTasks` hook with in-memory state
- Four quadrants: "やる" (Do), "予定する" (Schedule), "任せる" (Delegate), "削除する" (Delete)
- Each task has id, title, details, createdAt, and quadrant properties

**Drag and Drop:**
- Implemented with native HTML5 drag and drop API
- Tasks can be moved between quadrants by dragging
- Visual feedback during drag operations

**User Interface:**
- Japanese language throughout
- Color-coded quadrants with different themes
- Inline editing for tasks with Ctrl+Enter to save, Escape to cancel
- Responsive grid layout for desktop and mobile

### State Management

The application uses React's built-in state management with the `useTasks` hook providing:
- `addTask` - Add new task to specific quadrant
- `updateTask` - Update existing task properties
- `deleteTask` - Remove task from state
- `moveTask` - Move task between quadrants
- `getTasksByQuadrant` - Filter tasks by quadrant

### Styling and UI

- Tailwind CSS for utility-first styling
- Gradient backgrounds and card-based layout
- Hover effects and transitions for better UX
- Responsive design with mobile-first approach

## Docker Setup

The project includes Docker configuration for both development and production environments:

**Files:**
- `Dockerfile` - Multi-stage production build with nginx
- `Dockerfile.dev` - Development container with hot reload
- `docker-compose.yml` - Service definitions with profiles
- `nginx.conf` - Production nginx configuration
- `.dockerignore` - Docker build context exclusions

**Production Build:**
- Uses multi-stage build to minimize image size
- Node.js Alpine for build stage
- Nginx Alpine for production serving
- Includes security headers and gzip compression
- Health check endpoint at `/health`
- Optimized caching for static assets

**ECS Deployment Ready:**
- Production image is optimized for AWS ECS
- Includes proper health checks
- Configurable through environment variables
- Follows container best practices

## Architecture Benefits

**Feature-Based Structure:**
- Related files are co-located within features
- Easy to add new features without affecting existing ones
- Clear separation between shared and feature-specific code
- Scalable for future backend API integration
- Supports team development with clear ownership boundaries

**Backend Integration Ready:**
- Structure aligns with planned Node.js + Express backend
- API layer prepared for future database persistence
- Domain-driven design facilitates full-stack development