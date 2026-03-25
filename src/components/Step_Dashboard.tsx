import { User, Eye, Shield, ArrowUpRight, QrCode, Scan, PiggyBank, CreditCard, Percent, Home, ArrowDown, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface StepDashboardProps {
  name: string;
  amount: number;
  paymentDay: number;
  onWithdraw: () => void;
}

export function Step_Dashboard({ name, amount, paymentDay, onWithdraw }: StepDashboardProps) {
  const firstName = name.split(' ')[0];
  
  // Calculate next payment date
  const today = new Date();
  let nextMonth = today.getMonth() + 1;
  let year = today.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    year++;
  }
  const nextPaymentDate = `${paymentDay}/${(nextMonth + 1).toString().padStart(2, '0')}/${year}`;

  // Calculate installment value (approximate)
  const installmentValue = (amount * 1.15) / 12; // Example calculation

  return (
    <div className="min-h-screen bg-slate-50 -m-6 flex flex-col">
      {/* Blue Header */}
      <div className="bg-blue-600 text-white p-8 pt-12 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <User size={24} />
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <Eye size={20} />
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <Shield size={20} />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-1">Olá, {firstName}</h2>
          <p className="text-blue-100 text-sm mb-4">Saldo em conta</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">
              {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <p className="text-blue-200 text-xs mt-2 flex items-center gap-1">
            <ArrowUpRight size={14} />
            rendendo 102% do CDI
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="grid grid-cols-4 gap-4">
          <button 
            onClick={onWithdraw}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400">
              <ArrowUpRight size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 text-center">Sacar agora</span>
          </button>
          <button 
            onClick={onWithdraw}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400">
              <QrCode size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 text-center">PIX</span>
          </button>
          <button 
            onClick={onWithdraw}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400">
              <Scan size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 text-center">Pagar boleto</span>
          </button>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400">
              <PiggyBank size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 text-center">Cofrinhos</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-4 flex-1">
        {/* Loan Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Seu Empréstimo</h3>
            <button 
              onClick={onWithdraw}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-transform"
            >
              Sacar
              <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="space-y-1 mb-6">
            <p className="text-xs text-slate-400 font-medium">Valor disponível:</p>
            <p className="text-2xl font-black text-slate-800">
              {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Próximo vencimento:</span>
            <span className="text-xs font-bold text-slate-600">
              {nextPaymentDate} - {installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>

        {/* Cards Info */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
            <CreditCard size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm">Cartões</h4>
            <p className="text-[10px] text-slate-400">Cartão de crédito sem anuidade com limite pré-aprovado.</p>
          </div>
          <ArrowUpRight size={20} className="text-slate-300" />
        </div>

        {/* Loans Info */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
            <Percent size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm">Empréstimos</h4>
            <p className="text-[10px] text-slate-400">Gerencie ou solicite novos valores</p>
          </div>
          <ArrowUpRight size={20} className="text-slate-300" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center sticky bottom-0">
        <div className="flex flex-col items-center gap-1 text-blue-600">
          <Home size={24} />
          <span className="text-[10px] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-300">
          <ArrowDown size={24} />
          <span className="text-[10px] font-bold">Saque</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-300">
          <UserCircle size={24} />
          <span className="text-[10px] font-bold">Meus Dados</span>
        </div>
      </div>
    </div>
  );
}
