# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Ink Extend** is an AI-powered web application that helps users visualize and design tattoo extensions. Users upload a photo of their current tattoo and use AI (Gemini) to generate realistic on-body mockups with various styles and intensities. The app uses Firebase for authentication and user profile management.

## Development Commands

### Install & Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts the Vite dev server. The app will be available at `http://localhost:5173` by default.

### Production Build
```bash
npm build
```
Builds the app for production to the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build before deployment.

### Environment Variables
Create a `.env.local` file in the root directory with:
```
GEMINI_API_KEY=<your-gemini-api-key>
```

The API key is exposed to the client via Vite's `define` config in `vite.config.ts` and is required for the Gemini image generation to work.

## Architecture Overview

### Tech Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via inline classes)
- **Authentication**: Firebase Authentication (Google provider only)
- **Database**: Firebase Firestore
- **AI Image Generation**: Google Gemini API (gemini-2.5-flash-image-preview)

### Core Data Flow

1. **Authentication** → User signs in via Firebase Google Auth
2. **User Profile** → Profile created in Firestore (`users/{uid}`) with credit system
3. **Image Upload** → User uploads tattoo image, converted to base64
4. **Generation** → Image + prompt sent to Gemini API for tattoo extension
5. **Results** → Generated images displayed, generation history saved to Firestore (`users/{uid}/generations`)

### Key Files & Their Responsibilities

#### App State & Main Component
- **App.tsx** - Main component managing all state: auth, form inputs, generation results, UI modals
- **types.ts** - TypeScript definitions: `User`, `UserProfile`, `GenerationResult`, `UploadedFile`, enums for `IdeaMode`, `TattooStyle`, `Intensity`
- **constants.ts** - Configuration: preset ideas, random ideas, safety keywords, free daily limit

#### Services Layer
- **services/userService.ts** - Firestore operations: `getUserProfile`, `createUserProfile`, `useCredit`, `saveGeneration`
- **services/geminiService.ts** - Gemini API integration: `generateTattooExtensions`, handles base64 image encoding and prompt assembly
- **firebase.ts** - Firebase initialization and service exports

#### Components
- **Header.tsx** - Top nav with user profile, sign-in/out, and upgrade buttons
- **Uploader.tsx** - File upload with preview, converts image to base64
- **IdeaSelector.tsx** - Three modes for tattoo ideas: Random (pre-defined), Custom (user text), Presets (curated designs)
- **StyleControls.tsx** - Toggle tattoo style (Black & Grey / Color) and intensity (Subtle / Balanced / Bold)
- **ResultsGrid.tsx** - Grid display of generated images
- **AuthGateOverlay.tsx** - Blur overlay when user not logged in
- **modals/SignInModal.tsx** - Google sign-in prompt
- **modals/UpgradeModal.tsx** - Credit upgrade/purchase modal
- **icons/** - SVG icon components

### User Credit System
- Free users get `FREE_DAILY_LIMIT` (3) credits per day
- Each generation costs 1 credit
- Credits are decremented after successful generation
- Upgrade modal prompts users when credits = 0

### Safety & Validation
- **Client-side validation** in `App.tsx`:
  - Checks `SAFETY_KEYWORDS` in custom prompts (e.g., "nude", "violent", "explicit")
  - Minimum prompt length for custom mode (10 chars)
  - File upload required before generation
  - Auth check before generation

### Prompt Assembly
The final prompt sent to Gemini combines:
1. **Base prompt** - From selected idea mode (Random/Custom/Preset)
2. **Style directive** - Black & Grey color restriction if selected
3. **Intensity directive** - Subtle (minimal additions), Balanced, or Bold (high contrast)

Example: `"extend upward with flowing peonies and soft black & grey shading in black and grey only."`

### Gemini Integration Notes
- Model: `gemini-2.5-flash-image-preview`
- Accepts image + multimodal request (image + text input)
- Response modalities set to `[IMAGE, TEXT]`
- Returns base64-encoded image in `part.inlineData`
- Converts to data URI: `data:{mimeType};base64,{base64Data}`
- Error handling catches and provides user-friendly messages

### Firebase Structure
**Collections**:
- `users/{uid}` - User profiles (Firestore doc)
  - `uid`, `email`, `name`, `picture`, `plan`, `credits`
- `users/{uid}/generations` - Subcollection of generations
  - `prompt`, `imageUrls[]`, `createdAt` (server timestamp)

## Important Implementation Details

### Image Handling
- Images stored as base64 strings in memory (not persisted to storage)
- MIME type extracted from uploaded file
- Preview generated via `FileReader.readAsDataURL()` in Uploader component

### State Management
- All state managed in `App.tsx` using `useState`
- No external state management library (Redux/Zustand)
- Child components receive props and callbacks for state updates

### Tailwind & Styling
- All CSS via Tailwind utility classes in JSX
- Custom CSS variables for brand colors:
  - `bg-brand-primary`, `bg-brand-secondary`, `text-brand-accent` (yellow)
- Responsive design using `md:` breakpoints

### Error Handling
- User-facing error messages shown in red text above generate button
- Console logging for debugging in catch blocks
- Network/API errors caught and wrapped in user-friendly messages

### API Key Security
- **Note**: Gemini API key is exposed to the client (necessary for browser-based image generation)
- Should implement backend proxy for production to protect key and rate limit
- `.env.local` is git-ignored

## Common Development Tasks

### Adding a New Generation Parameter
1. Add enum/interface to `types.ts`
2. Add state variable to `App.tsx`
3. Add UI control component (or use existing `StyleControls` as template)
4. Update `getPrompt()` callback to include new parameter
5. Update component tests if they exist

### Updating Gemini Model or Prompt
- Model name in `services/geminiService.ts:36`
- Base prompt assembly in `services/geminiService.ts:13-15`
- User-facing prompt guidance in components or constants

### Modifying Credit System
- Free limit in `constants.ts: FREE_DAILY_LIMIT`
- Credit increment/decrement logic in `App.tsx` and `services/userService.ts`
- Payment/upgrade logic would need backend implementation (not currently implemented)

### Adding New Preset Ideas
- Edit `PRESETS` array in `constants.ts`
- Each preset needs `id` (unique) and `title` (displayed to user)
- IdeaSelector component automatically renders all presets

## Known Limitations & TODOs

- **API Key Exposure**: Gemini key is client-side; production should use backend proxy
- **No Payment System**: Upgrade modal UI exists but no actual payment flow implemented
- **No Rate Limiting**: Client-side safety checks only; should add server-side validation
- **Limited Error Recovery**: Failed generations don't have retry logic
- **No Caching**: Each generation calls Gemini API (could cache similar requests)
