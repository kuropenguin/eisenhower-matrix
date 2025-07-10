# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Project Architecture

This is a React + TypeScript Eisenhower Matrix application built with Vite for task prioritization and management. The app is completely in Japanese and uses a drag-and-drop interface to organize tasks by urgency and importance.

### Core Architecture

**Frontend Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- Tailwind CSS for styling
- Lucide React for icons

**Project Structure:**
- `src/App.tsx` - Main application component with drag-and-drop logic
- `src/components/` - Reusable UI components (QuadrantCard, TaskCard)
- `src/types/index.ts` - TypeScript type definitions for Task and Quadrant
- `src/data/quadrants.ts` - Static configuration for the four matrix quadrants
- `src/hooks/useTasks.ts` - Custom hook for task state management

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