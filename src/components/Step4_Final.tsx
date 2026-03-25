import { CheckCircle2, Star, ShieldCheck, Landmark, ArrowRight, Zap, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface Step4Props {
  name: string;
  amount: number;
}

export function Step4_Final({ name, amount }: Step4Props) {
  const firstName = name ? name.split(' ')[0] : 'Cliente';
  
  // Calculate options based on user request
  // Option 1: Original
  // Option 2: +1000 (up to 20k)
  // Option 3: +2000 (up to 20k)
  
  const calculateBaseInsurance = (loanAmount: number) => {
    if (loanAmount <= 5000) return 8.90;
    return loanAmount * 0.0022;
  };

  const baseInsurance = calculateBaseInsurance(amount);
  
  const opt1Amount = amount;
  const opt2Amount = Math.min(amount + 1000, 20000);
  const opt3Amount = Math.min(amount + 2000, 20000);

  const options = [
    { 
      id: 'opt1', 
      amount: opt1Amount, 
      insurance: baseInsurance, 
      installments: 12,
      installmentValue: (opt1Amount * 1.18) / 12,
      recommended: false
    },
    { 
      id: 'opt2', 
      amount: opt2Amount, 
      insurance: baseInsurance + 6.00, 
      installments: 12,
      installmentValue: (opt2Amount * 1.18) / 12,
      recommended: true
    },
    { 
      id: 'opt3', 
      amount: opt3Amount, 
      insurance: baseInsurance + 12.00, 
      installments: 12,
      installmentValue: (opt3Amount * 1.18) / 12,
      recommended: false
    }
  ].filter((opt, index, self) => 
    // Remove duplicates if amount is capped at 20k
    index === self.findIndex((t) => t.amount === opt.amount)
  );

  const [selectedOpt, setSelectedOpt] = useState(options[0].id);
  const currentOpt = options.find(o => o.id === selectedOpt) || options[0];

  const [notification, setNotification] = useState({ show: false, name: '', city: '', amount: 0 });

  useEffect(() => {
    const names = ['Patrícia M.', 'Ricardo S.', 'Amanda L.', 'Marcos V.', 'Juliana F.'];
    const cities = ['Fortaleza', 'São Paulo', 'Curitiba', 'Belo Horizonte', 'Salvador'];
    
    const showNotification = () => {
      setNotification({
        show: true,
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        amount: Math.floor(Math.random() * 15000) + 2000
      });

      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    };

    const interval = setInterval(showNotification, 12000);
    setTimeout(showNotification, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 -m-6 flex flex-col items-center">
      {/* Stellanz Header */}
      <div className="w-full bg-blue-600 text-white py-8 px-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <div className="bg-white p-1.5 rounded-lg">
            <Landmark size={24} className="text-blue-600" />
          </div>
          <span className="font-bold text-2xl tracking-tight">Vaidabom</span>
        </div>

        <div className="flex flex-col items-center gap-2 relative z-10">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            <ShieldCheck size={20} />
            <span className="font-bold text-sm tracking-wide">Parceria Oficial Stellanz</span>
          </div>
          <p className="text-blue-100 text-[10px] font-bold uppercase tracking-[0.2em]">Proteção garantida para seu empréstimo</p>
        </div>
      </div>

      <div className="max-w-xl w-full px-6 py-10 space-y-8">
        {/* Welcome Message */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">{firstName}!</h2>
          <p className="text-slate-500 font-medium">Seu empréstimo está quase liberado</p>
        </div>

        {/* Benefits Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Zap size={20} className="text-amber-500" />
            Benefícios inclusos no seguro:
          </h3>
          <ul className="space-y-4">
            {[
              'Proteção em caso de morte ou invalidez',
              'Proteção contra desemprego',
              'Liberação imediata do valor total',
              '100% reembolsável após quitação',
              'Sem carência - vale desde o 1º dia'
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Star size={20} className="text-amber-500" />
            Avaliações dos clientes
          </h3>
          <div className="space-y-6">
            {[
              { 
                name: 'Maria S.', 
                text: '"Processo muito rápido e seguro. O valor foi liberado em minutos!"' 
              },
              { 
                name: 'João P.', 
                text: '"Excelente suporte e transparência. O crédito caiu na conta exatamente como prometido."' 
              }
            ].map((review, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {review.name.charAt(0)}
                    </div>
                    <p className="font-bold text-slate-800 text-sm">{review.name}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Offer */}
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Oferta Selecionada:</p>
          <div className="bg-white rounded-[32px] p-8 shadow-xl border-2 border-blue-600 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest">
              Aprovado
            </div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Valor aprovado para liberação</p>
                <p className="text-3xl font-black text-slate-800">
                  {currentOpt.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-xs font-bold text-blue-600">
                  {currentOpt.installments}x de {currentOpt.installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Seguro</p>
                <p className="text-xl font-black text-green-600">
                  {currentOpt.insurance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Info size={14} className="text-blue-600" />
                Tarifa do Seguro (Pagamento Único)
              </p>
              <p className="text-sm font-black text-slate-800">
                {currentOpt.insurance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>
        </div>

        {/* Other Offers */}
        {options.length > 1 && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Temos mais {options.length - 1} ofertas aprovadas pra seu CPF:</p>
            <div className="space-y-3">
              {options.map((opt) => (
                opt.id !== selectedOpt && (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOpt(opt.id)}
                    className="w-full bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-transparent" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Você receberá</p>
                        <p className="text-xl font-black text-slate-800">
                          {opt.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="text-[10px] font-bold text-slate-500">
                          {opt.installments}x de {opt.installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Seguro</p>
                      <p className="text-lg font-black text-green-600">
                        {opt.insurance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </button>
                )
              ))}
            </div>
          </div>
        )}

        {/* Payment Section */}
        <div className="pt-10 flex flex-col items-center space-y-6">
          <div className="text-center">
            <p className="text-3xl font-black text-green-600">
              {currentOpt.insurance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Pagamento único via PIX</p>
          </div>

          <button className="w-full bg-green-600 text-white py-6 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 active:scale-95 transition-transform">
            <Zap size={24} />
            Pagar seguro
          </button>

          <div className="space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <CheckCircle2 size={16} className="text-green-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Pagamento reconhecido automaticamente</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <ShieldCheck size={16} className="text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Processo 100% seguro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-6 left-6 z-50 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-[280px]"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <Zap size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-800">
                {notification.name} de {notification.city}
              </p>
              <p className="text-[10px] text-slate-500">
                Conseguiu o crédito de <span className="font-bold text-green-600">{notification.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </p>
              <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5 }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
