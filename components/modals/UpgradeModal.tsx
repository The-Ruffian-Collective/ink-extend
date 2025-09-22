

import React from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanCard: React.FC<{ title: string; price: string; features: string[]; isPopular?: boolean }> = ({ title, price, features, isPopular }) => (
    <div className={`relative border-2 p-6 rounded-lg ${isPopular ? 'border-brand-accent' : 'border-gray-700'}`}>
        {isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-primary px-3 py-1 rounded-full text-xs font-bold">POPULAR</div>}
        <h3 className="text-xl font-bold text-center">{title}</h3>
        <p className="text-3xl font-extrabold text-center my-4">{price}<span className="text-base font-medium text-gray-400">/mo</span></p>
        <ul className="space-y-2 text-sm text-gray-300">
            {features.map(f => <li key={f} className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-accent flex-shrink-0" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{f}</li>)}
        </ul>
        <button className="w-full mt-6 py-2 bg-brand-accent text-brand-primary font-semibold rounded-md hover:bg-yellow-300 transition-colors">Choose Plan</button>
    </div>
);


export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const handleCheckout = () => {
      alert('Checkout is coming soon!');
      // In a real app, this would call /api/checkout
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-secondary rounded-lg p-8 m-4 max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center text-brand-accent mb-2">Upgrade Your Plan</h2>
        <p className="text-center text-gray-400 mb-8">Unlock more generations and advanced features.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
            <PlanCard title="Starter" price="$10" features={['50 generations/month', 'Standard quality', 'Community support']} />
            <PlanCard title="Pro" price="$25" features={['200 generations/month', 'Highest quality', 'Priority support', 'Early access to new styles']} isPopular />
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">Credits reset at 00:00 Europe/London time.</p>

        <div className="text-center mt-6">
            <button onClick={onClose} className="text-sm text-gray-400 hover:text-white">Maybe later</button>
        </div>
      </div>
    </div>
  );
};