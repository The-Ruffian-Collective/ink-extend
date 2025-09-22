
import React, { useState, useCallback, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import * as userService from './services/userService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Uploader } from './components/Uploader';
import { IdeaSelector } from './components/IdeaSelector';
import { StyleControls } from './components/StyleControls';
import { ResultsGrid } from './components/ResultsGrid';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { SignInModal } from './components/modals/SignInModal';
import { AuthGateOverlay } from './components/AuthGateOverlay';
import { generateTattooExtensions } from './services/geminiService';
import { RANDOM_IDEAS, SAFETY_KEYWORDS, PRESETS } from './constants';
import { IdeaMode, TattooStyle, Intensity, type User, type UserProfile, type GenerationResult, type UploadedFile } from './types';


export default function App() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  
  // Form State
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [ideaMode, setIdeaMode] = useState<IdeaMode>(IdeaMode.Random);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0].id);
  const [tattooStyle, setTattooStyle] = useState<TattooStyle>(TattooStyle.BlackAndGrey);
  const [intensity, setIntensity] = useState<Intensity>(Intensity.Balanced);
  
  // Results
  const [results, setResults] = useState<GenerationResult[]>([]);

  // --- Auth & DB Logic ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profile = await userService.getUserProfile(currentUser.uid);
        if (profile) {
          setUserProfile(profile);
        } else {
          // If profile doesn't exist, create it. This happens on first sign-up.
          const newProfile = await userService.createUserProfile(currentUser);
          setUserProfile(newProfile);
        }
      } else {
        setUserProfile(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const signIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        setSignInModalOpen(false);
    } catch (error) {
        console.error("Error during sign in: ", error);
        setError("Failed to sign in. Please try again.");
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    // Reset app state completely
    setUploadedFile(null);
    setResults([]);
    setError(null);
    setIdeaMode(IdeaMode.Random);
    setCustomPrompt('');
    setSelectedPreset(PRESETS[0].id);
    setTattooStyle(TattooStyle.BlackAndGrey);
    setIntensity(Intensity.Balanced);
  };
  // --- End Auth & DB Logic ---

  const getPrompt = useCallback(() => {
    let basePrompt = '';
    if (ideaMode === IdeaMode.Custom) {
        basePrompt = customPrompt;
    } else if (ideaMode === IdeaMode.Presets) {
        basePrompt = PRESETS.find(p => p.id === selectedPreset)?.title || '';
    } else { // Random
        basePrompt = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
    }
    
    let stylePrompt = '';
    if(tattooStyle === TattooStyle.BlackAndGrey) stylePrompt += ' in black and grey only.';
    if(intensity === Intensity.Subtle) stylePrompt += ' use minimal additions and soft shading.';
    if(intensity === Intensity.Bold) stylePrompt += ' use high contrast and bold new elements.';

    return `${basePrompt}${stylePrompt}`;
  }, [ideaMode, customPrompt, selectedPreset, tattooStyle, intensity]);

  const handleGenerate = async () => {
    if (!user || !userProfile) {
        setError("You must be signed in to generate.");
        return;
    }
    if (userProfile.credits <= 0) {
        setUpgradeModalOpen(true);
        return;
    }
    if (!uploadedFile) {
        setError("Please upload a photo of your tattoo first.");
        return;
    }
    const finalPrompt = getPrompt();
    if (ideaMode === IdeaMode.Custom && finalPrompt.trim().length < 10) {
        setError("Please describe your idea in a bit more detail.");
        return;
    }

    const hasBlockedWord = SAFETY_KEYWORDS.some(word => finalPrompt.toLowerCase().includes(word));
    if (hasBlockedWord) {
        setError("Your prompt seems to contain inappropriate content. Please revise it.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
        const imageUrls = await generateTattooExtensions(uploadedFile, finalPrompt, 2);
        const newResults = imageUrls.map(url => ({ id: Math.random().toString(36).substring(2, 9), imageUrl: url }));
        setResults(newResults);
        
        await userService.useCredit(user.uid);
        setUserProfile(prev => prev ? { ...prev, credits: prev.credits - 1 } : null);
        await userService.saveGeneration(user.uid, finalPrompt, newResults.map(r => r.imageUrl));

    } catch (err: any) {
        setError(err.message || "An unknown error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleSetRandomIdea = () => {
    const randomIdea = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
    setCustomPrompt(randomIdea);
  };

  if (authLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-primary">
             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
        </div>
    );
  }

  const isGeneratorLocked = !user;
  const credits = userProfile?.credits ?? 0;
  const canGenerate = !isLoading && !!uploadedFile && credits > 0 && (ideaMode !== IdeaMode.Custom || customPrompt.trim().length > 0);

  return (
    <>
      <div className="min-h-screen flex flex-col font-sans">
        <Header 
          userProfile={userProfile}
          onSignIn={() => setSignInModalOpen(true)}
          onSignOut={signOut}
          onUpgrade={() => setUpgradeModalOpen(true)}
        />
        
        <main className="flex-grow flex flex-col items-center pt-8 md:pt-16">
          <div className="w-full max-w-xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Visualize Your Next Ink</h1>
            <p className="mt-4 text-lg text-gray-400">
                Upload your current tattoo and let AI generate realistic extensions and updates, right on your skin.
            </p>
          </div>

          <div className="relative w-full max-w-xl mx-auto mt-12 px-4">
            <AuthGateOverlay isLocked={isGeneratorLocked} onUnlock={() => setSignInModalOpen(true)} />
            <div className={`p-6 sm:p-8 bg-brand-secondary/50 rounded-lg space-y-6 border border-gray-700 ${isGeneratorLocked ? 'blur-sm' : ''}`}>
              <Uploader key={user ? user.uid : 'logged-out'} onFileSelect={setUploadedFile} disabled={isGeneratorLocked} />
              <IdeaSelector
                mode={ideaMode}
                setMode={setIdeaMode}
                customPrompt={customPrompt}
                setCustomPrompt={setCustomPrompt}
                selectedPreset={selectedPreset}
                setSelectedPreset={setSelectedPreset}
                setRandomIdea={handleSetRandomIdea}
                disabled={isGeneratorLocked}
              />
              <StyleControls 
                style={tattooStyle}
                setStyle={setTattooStyle}
                intensity={intensity}
                setIntensity={setIntensity}
                disabled={isGeneratorLocked}
              />
              <div className="pt-2">
                {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                <button
                    onClick={handleGenerate}
                    disabled={isGeneratorLocked || !canGenerate || isLoading}
                    className="w-full py-4 text-lg font-bold rounded-lg transition-all duration-300
                    bg-brand-accent text-brand-primary
                    hover:bg-yellow-300 
                    disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generating...' : `Generate (${credits} left)`}
                </button>
              </div>
            </div>
          </div>
          
          {isLoading && (
            <div className="mt-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
                <p className="mt-2 text-gray-400">Brewing up some ideas...</p>
            </div>
          )}
          
          {results.length > 0 && (
            <ResultsGrid results={results} onRegenerate={handleGenerate} isLoading={isLoading}/>
          )}

        </main>
        
        <Footer />
      </div>

      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} />
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setSignInModalOpen(false)} onSignIn={signIn} />
    </>
  );
}