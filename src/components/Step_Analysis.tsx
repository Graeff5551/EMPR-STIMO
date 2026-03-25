import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Search, FileText, Database } from 'lucide-react';

interface StepAnalysisProps {
  onComplete: () => void;
}

export function Step_Analysis({ onComplete }: StepAnalysisProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Iniciando análise de crédito...');

  useEffect(() => {
    const messages = [
      'Consultando órgãos de proteção ao crédito...',
      'Verificando histórico de pagamentos...',
      'Validando informações cadastrais...',
      'Processando limite disponível...',
      'Finalizando análise de risco...'
    ];

    let currentMessageIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        // Update message based on progress
        const nextIndex = Math.floor((prev / 100) * messages.length);
        if (nextIndex > currentMessageIndex && nextIndex < messages.length) {
          currentMessageIndex = nextIndex;
          setMessage(messages[nextIndex]);
        }
        
        return prev + 1;
      });
    }, 50); // 50ms * 100 = 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="relative mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-4 border-slate-100 border-t-bancred-blue rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Search size={40} className="text-bancred-blue" />
          </motion.div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Estamos analisando sua proposta</h2>
      <p className="text-slate-500 mb-8 h-6">{message}</p>

      <div className="w-full max-w-xs bg-slate-100 h-2 rounded-full overflow-hidden mb-12">
        <motion.div
          className="h-full bg-bancred-blue"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-8 opacity-40">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Seguro</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FileText size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Rápido</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Database size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Preciso</span>
        </div>
      </div>
    </div>
  );
}
