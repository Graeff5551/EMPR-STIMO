import { useState } from 'react';
import { ShieldAlert, ShieldCheck, ChevronRight, Info } from 'lucide-react';

interface StepCreditStatusProps {
  onNext: (status: 'negative' | 'clean') => void;
}

export function Step_CreditStatus({ onNext }: StepCreditStatusProps) {
  const [selected, setSelected] = useState<'negative' | 'clean' | null>(null);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Situação de Crédito</h2>
      <p className="text-slate-500 mb-8 text-center">Informe como está seu nome nos órgãos de proteção ao crédito</p>

      <div className="space-y-4">
        <button
          onClick={() => setSelected('negative')}
          className={`w-full p-6 bg-white border-2 rounded-2xl text-left transition-all ${
            selected === 'negative' ? 'border-bancred-blue bg-bancred-blue/5' : 'border-slate-100'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${selected === 'negative' ? 'bg-bancred-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-800">Tenho algumas pendências</p>
              <p className="text-sm text-slate-500">Nome negativado ou restrições no CPF</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelected('clean')}
          className={`w-full p-6 bg-white border-2 rounded-2xl text-left transition-all ${
            selected === 'clean' ? 'border-bancred-blue bg-bancred-blue/5' : 'border-slate-100'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${selected === 'clean' ? 'bg-bancred-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-800">Meu nome está limpo</p>
              <p className="text-sm text-slate-500">Sem restrições ou negativação</p>
            </div>
          </div>
        </button>

        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start mt-6">
          <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed font-medium">
            Não se preocupe! Trabalhamos com pessoas em qualquer situação de crédito.
          </p>
        </div>

        <button
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg mt-4"
        >
          <span>Continuar</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
