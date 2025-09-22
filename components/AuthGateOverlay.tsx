
import React from 'react';

interface AuthGateOverlayProps {
  isLocked: boolean;
  onUnlock: () => void;
}

export const AuthGateOverlay: React.FC<AuthGateOverlayProps> = ({ isLocked, onUnlock }) => {
  if (!isLocked) return null;

  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">Ready to create?</h3>
        <p className="text-gray-300 mb-4">Sign in to start generating.</p>
        <button
          onClick={onUnlock}
          className="bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          Sign In / Sign Up
        </button>
      </div>
    </div>
  );
};