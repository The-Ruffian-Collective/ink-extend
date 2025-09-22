

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-24 py-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
        <p className="text-sm">Images are AI-generated visualizations only. Always consult a professional tattoo artist.</p>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <a href="#" className="hover:text-brand-light">Terms of Service</a>
          <span>&middot;</span>
          <a href="#" className="hover:text-brand-light">Privacy Policy</a>
        </div>
        <p className="mt-4 text-xs">&copy; {new Date().getFullYear()} Ink Extend. All rights reserved.</p>
      </div>
    </footer>
  );
};