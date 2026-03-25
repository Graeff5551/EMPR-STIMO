import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';

const NOTIFICATIONS = [
  { name: 'Cláudia J.', city: 'Goiânia', value: 'R$ 17.450,00' },
  { name: 'Marcos R.', city: 'São Paulo', value: 'R$ 5.200,00' },
  { name: 'Ana P.', city: 'Curitiba', value: 'R$ 12.000,00' },
  { name: 'Ricardo S.', city: 'Belo Horizonte', value: 'R$ 8.500,00' },
  { name: 'Juliana M.', city: 'Fortaleza', value: 'R$ 20.000,00' },
];

export function SocialProof() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
      setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
    }, 8000);

    return () => clearInterval(showTimer);
  }, []);

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 pointer-events-none z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white/90 backdrop-blur-sm border border-bancred-green/20 rounded-full px-4 py-2 shadow-lg flex items-center gap-3 max-w-sm"
          >
            <div className="bg-bancred-green rounded-full p-1">
              <CheckCircle size={16} className="text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700">
              <span className="font-bold">{NOTIFICATIONS[index].name}</span> de {NOTIFICATIONS[index].city} recebeu via PIX <span className="text-bancred-green font-bold">{NOTIFICATIONS[index].value}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
