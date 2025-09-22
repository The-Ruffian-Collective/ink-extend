
import React from 'react';
import type { UserProfile } from '../types';
import { FREE_DAILY_LIMIT } from '../constants';

interface HeaderProps {
  userProfile: UserProfile | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onUpgrade: () => void;
}

const CreditBadge: React.FC<{ credits: number }> = ({ credits }) => (
  <div className="bg-brand-secondary text-sm font-semibold px-4 py-1.5 rounded-full">
    Credits: <span className="text-brand-accent">{credits}</span> / {FREE_DAILY_LIMIT}
  </div>
);


export const Header: React.FC<HeaderProps> = ({ userProfile, onSignIn, onSignOut, onUpgrade }) => {
  return (
    <header className="py-4 px-4 sm:px-8 w-full">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter">
          Ink Extend <span className="text-xs align-top bg-brand-accent text-brand-primary font-bold px-1.5 py-0.5 rounded">BETA</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {userProfile ? (
            <>
              <CreditBadge credits={userProfile.credits} />
              <button 
                onClick={onUpgrade}
                className="hidden sm:inline-block bg-brand-accent text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-yellow-300 transition-colors"
              >
                Upgrade
              </button>
              <button 
                onClick={onSignOut}
                className="bg-brand-secondary text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Sign Out
              </button>
              {userProfile.picture && (
                <img src={userProfile.picture} alt={userProfile.name || 'User'} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
              )}
            </>
          ) : (
            <button 
              onClick={onSignIn}
              className="bg-brand-accent text-brand-primary text-sm font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};