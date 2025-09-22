import React from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.332,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignIn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-secondary rounded-lg p-8 m-4 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Sign In or Sign Up</h2>
        <p className="text-gray-400 mb-6">Sign in to save your mock-ups and get free daily credits.</p>
        
        <div className="flex justify-center">
            <button
              onClick={onSignIn}
              className="flex items-center justify-center gap-3 w-full max-w-xs bg-white text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              <GoogleIcon />
              Sign In with Google
            </button>
        </div>
        
        <button onClick={onClose} className="mt-6 text-sm text-gray-500 hover:text-white">
          Maybe later
        </button>
      </div>
    </div>
  );
};