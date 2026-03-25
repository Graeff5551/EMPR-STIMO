import { motion } from 'motion/react';
import { REASONS } from '../types';
import * as Icons from 'lucide-react';

interface Step2Props {
  onNext: (reason: string) => void;
  name?: string;
}

export function Step2_Reason({ onNext, name }: Step2Props) {
  const firstName = name ? name.split(' ')[0] : '';

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
        {firstName ? `Olá, ${firstName}!` : 'Motivo do Empréstimo'}
      </h2>
      <p className="text-slate-500 mb-8 text-center">
        {firstName ? 'Para que você precisa do empréstimo hoje?' : 'Para que você precisa do empréstimo?'}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {REASONS.map((reason) => {
          const Icon = (Icons as any)[reason.icon];
          return (
            <button
              key={reason.id}
              onClick={() => onNext(reason.label)}
              className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-bancred-blue hover:bg-bancred-blue/5 transition-all group active:scale-95"
            >
              <div className="bg-slate-50 p-3 rounded-xl mb-3 group-hover:bg-bancred-blue group-hover:text-white transition-colors">
                <Icon size={24} className="text-slate-600 group-hover:text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-bancred-blue text-center">
                {reason.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
