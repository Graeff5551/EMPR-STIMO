import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { INSTALLMENT_OPTIONS } from '../types';

interface Step3Props {
  onNext: (amount: number, installments: number) => void;
  onBack: () => void;
}

export function Step3_Simulation({ onNext, onBack }: Step3Props) {
  const [amount, setAmount] = useState(5000);
  const [installments, setInstallments] = useState(12);

  const simulation = useMemo(() => {
    // Basic interest rate simulation logic
    const rate = 0.025; // 2.5% per month
    const monthly = (amount * rate) / (1 - Math.pow(1 + rate, -installments));
    const total = monthly * installments;

    return {
      monthly: monthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      total: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      summary: `${installments} parcelas de ${monthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    };
  }, [amount, installments]);

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulação de Valores</h2>
        <p className="text-slate-500">Escolha o valor e o prazo ideal para você</p>
      </div>

      <div className="space-y-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Valor desejado</span>
            <span className="text-2xl font-bold text-bancred-blue">
              {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="20000"
            step="100"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-bancred-blue"
          />
          <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
            <span>R$ 1.000</span>
            <span>R$ 20.000</span>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider block">Número de parcelas</span>
          <div className="grid grid-cols-4 gap-2">
            {INSTALLMENT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setInstallments(opt)}
                className={`py-3 rounded-xl font-bold transition-all ${
                  installments === opt
                    ? 'bg-bancred-blue text-white shadow-md shadow-bancred-blue/20'
                    : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-slate-200'
                }`}
              >
                {opt}x
              </button>
            ))}
          </div>
        </div>

        <div className="bg-bancred-green p-6 rounded-2xl text-white shadow-lg shadow-bancred-green/20 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Sua simulação</span>
            <div className="mt-2 mb-4">
              <span className="text-4xl font-black">{simulation.monthly}</span>
              <span className="text-sm opacity-80 ml-1">/mês</span>
            </div>
            <div className="space-y-1 text-sm font-medium opacity-90 border-t border-white/20 pt-4">
              <div className="flex justify-between">
                <span>Total a pagar:</span>
                <span className="font-bold">{simulation.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Resumo:</span>
                <span className="font-bold">{simulation.summary}</span>
              </div>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>

        <p className="text-[10px] text-center text-slate-400 font-medium px-4">
          * Valores sujeitos à análise de crédito. Taxas podem variar de acordo com o perfil do cliente.
        </p>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={() => onNext(amount, installments)}
            className="flex-[2] btn-primary py-4 text-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
