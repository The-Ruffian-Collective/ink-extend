

import React from 'react';
import type { GenerationResult } from '../types';

interface ResultsGridProps {
  results: GenerationResult[];
  onRegenerate: () => void;
  isLoading: boolean;
}

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

const RedoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
);

export const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onRegenerate, isLoading }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Your Mock-ups</h2>
      <p className="text-center text-gray-400 mb-8">Not final. For visualization only. Consult a professional artist before inking.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {results.map((result) => (
          <div key={result.id} className="group relative rounded-lg overflow-hidden bg-brand-secondary">
            <img src={result.imageUrl} alt="Generated tattoo extension" className="w-full h-auto aspect-square object-cover" />
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 space-y-3">
              <a
                href={result.imageUrl}
                download={`ink-extend-mockup-${result.id}.png`}
                className="flex items-center gap-2 bg-brand-accent text-brand-primary px-4 py-2 rounded-md font-semibold text-sm hover:bg-yellow-300 transition-colors"
              >
                <DownloadIcon />
                Download
              </a>
              <button
                onClick={onRegenerate}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                <RedoIcon />
                Generate New Version
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};