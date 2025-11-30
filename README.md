# Ink Extend (Tattoo To You)

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🎨 Overview

**Ink Extend** is an AI-powered web application that helps tattoo enthusiasts visualize extensions and updates to their existing tattoos. Upload a photo of your current tattoo, describe your vision, and let cutting-edge AI generate realistic on-body mockups showing how your tattoo could evolve.

Perfect for:
- Planning your next tattoo session
- Exploring design possibilities before committing to ink
- Communicating ideas with your tattoo artist
- Experimenting with different styles and extensions

## ✨ Features

### 🖼️ AI-Powered Generation
- Powered by **Google Gemini 2.5 Flash** image generation model
- Generates 2 realistic variations per request
- Seamlessly blends new elements with existing tattoos
- Preserves natural skin texture and lighting

### 🎯 Flexible Design Modes
- **Random Ideas**: Get inspired with curated tattoo extension concepts
- **Custom Prompts**: Describe your exact vision in your own words
- **Preset Templates**: Choose from professionally crafted design themes
  - Floral black & grey extensions
  - Neo-traditional animal wraps
  - Geometric linework + shading
  - Japanese irezumi wave/peony fills
  - Script integration + filigree
  - Color splash effects

### 🎨 Style Customization
- **Tattoo Style**: Black & Grey or Color-allowed
- **Intensity Levels**:
  - **Subtle**: Minimal additions with soft shading
  - **Balanced**: Perfect harmony between old and new
  - **Bold**: High contrast with striking new elements

### 🔐 User Authentication & Credits
- Secure Google Sign-In via Firebase Authentication
- Credit-based system (3 free daily credits for all users)
- Persistent user profiles stored in Firestore
- Generation history tracking

### 🛡️ Safety Features
- Content filtering to prevent inappropriate prompts
- Automatic safety keyword detection
- Responsible AI usage guidelines

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **AI Model**: Google Gemini 2.5 Flash (Image Preview)
- **Hosting**: Compatible with Firebase Hosting, Vercel, Netlify

## 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))
- **Firebase Project** with Auth and Firestore enabled

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ink-extend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
API_KEY=your_gemini_api_key_here
```

### 4. Configure Firebase
Update `firebaseConfig.ts` with your Firebase project credentials:
```typescript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 5. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
ink-extend/
├── components/           # React components
│   ├── icons/           # SVG icon components
│   ├── modals/          # Modal dialogs
│   ├── AuthGateOverlay.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── IdeaSelector.tsx
│   ├── ResultsGrid.tsx
│   ├── StyleControls.tsx
│   └── Uploader.tsx
├── services/            # Business logic & API calls
│   ├── geminiService.ts  # AI generation logic
│   └── userService.ts    # Firestore user operations
├── App.tsx              # Main application component
├── constants.ts         # App-wide constants
├── firebase.ts          # Firebase initialization
├── firebaseConfig.ts    # Firebase configuration
├── types.ts             # TypeScript type definitions
├── index.tsx            # Application entry point
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## 🎯 Key Components

### `App.tsx`
Main application logic including:
- Authentication state management
- Generation orchestration
- Credit management
- UI state coordination

### `geminiService.ts`
Handles all AI generation:
- Assembles prompts with style and intensity modifiers
- Manages Gemini API calls
- Processes base64 image responses

### `userService.ts`
Firestore operations:
- User profile CRUD operations
- Credit management
- Generation history tracking

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | Google Gemini API key | Yes |

## 🚢 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Google Gemini AI](https://ai.google.dev/)
- Powered by [Firebase](https://firebase.google.com/)
- UI styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing discussions
- Review the [plan.md](./plan.md) for upcoming features

## 🔗 Links

- **AI Studio Demo**: https://ai.studio/apps/drive/1uLkLMaYQgrfXYQ_-aoO-H8YN0cPOA7LU
- **Google Gemini Docs**: https://ai.google.dev/docs
- **Firebase Docs**: https://firebase.google.com/docs

---

**Current Version**: 0.0.1 (Beta)

Made with ❤️ for tattoo enthusiasts and artists
