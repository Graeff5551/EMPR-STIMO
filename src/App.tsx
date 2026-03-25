import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, ChevronLeft } from 'lucide-react';
import { Step, LoanData } from './types';
import { Step1_CPF } from './components/Step1_CPF';
import { Step1_UserData } from './components/Step1_UserData';
import { Step2_Reason } from './components/Step2_Reason';
import { Step2_Details } from './components/Step2_Details';
import { Step_CreditStatus } from './components/Step_CreditStatus';
import { Step3_Simulation } from './components/Step3_Simulation';
import { Step_PaymentDay } from './components/Step_PaymentDay';
import { Step_Analysis } from './components/Step_Analysis';
import { Step_Approved } from './components/Step_Approved';
import { Step_PixInfo } from './components/Step_PixInfo';
import { Step_Dashboard } from './components/Step_Dashboard';
import { Step_WithdrawOptions } from './components/Step_WithdrawOptions';
import { Step4_Final } from './components/Step4_Final';
import { SocialProof } from './components/SocialProof';

export default function App() {
  const [step, setStep] = useState<Step>('cpf');
  const [data, setData] = useState<LoanData>({
    cpf: '',
    name: '',
    birthDate: '',
    phone: '',
    email: '',
    reason: '',
    income: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    occupation: '',
    creditStatus: undefined,
    paymentDay: undefined,
    pixKey: '',
    bankName: '',
    pixKeyType: '',
    amount: 5000,
    installments: 12,
  });

  const nextStep = (updates: Partial<LoanData>, next: Step) => {
    setData((prev) => ({ ...prev, ...updates }));
    setStep(next);
  };

  const getProgress = () => {
    switch (step) {
      case 'cpf': return 0;
      case 'user_data': return 7.7;
      case 'reason': return 15.4;
      case 'details': return 23.1;
      case 'credit_status': return 30.8;
      case 'simulation': return 38.5;
      case 'payment_day': return 46.2;
      case 'analysis': return 53.8;
      case 'approved': return 61.5;
      case 'pix_info': return 69.2;
      case 'dashboard': return 76.9;
      case 'withdraw_options': return 84.6;
      case 'final': return 100;
      default: return 0;
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case 'cpf': return 1;
      case 'user_data': return 2;
      case 'reason': return 3;
      case 'details': return 4;
      case 'credit_status': return 5;
      case 'simulation': return 6;
      case 'payment_day': return 7;
      case 'analysis': return 8;
      case 'approved': return 9;
      case 'pix_info': return 10;
      case 'dashboard': return 11;
      case 'withdraw_options': return 12;
      case 'final': return 13;
      default: return 0;
    }
  };

  // Temporary Navigation for Preview
  const steps: Step[] = ['cpf', 'user_data', 'reason', 'details', 'credit_status', 'simulation', 'payment_day', 'analysis', 'approved', 'pix_info', 'dashboard', 'withdraw_options', 'final'];
  const currentStepIndex = steps.indexOf(step);

  const goToPrev = () => {
    if (currentStepIndex > 0) setStep(steps[currentStepIndex - 1]);
  };

  const goToNext = () => {
    if (currentStepIndex < steps.length - 1) setStep(steps[currentStepIndex + 1]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dev Navigation Tool */}
      <div className="fixed bottom-20 right-4 z-[100] flex flex-col gap-2 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-2xl">
        <p className="text-[10px] text-white/60 font-bold uppercase text-center mb-1">Dev Nav</p>
        <div className="flex gap-2">
          <button 
            onClick={goToPrev}
            disabled={currentStepIndex === 0}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white disabled:opacity-30 transition-colors"
            title="Passo Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={goToNext}
            disabled={currentStepIndex === steps.length - 1}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white disabled:opacity-30 transition-colors"
            title="Próximo Passo"
          >
            <ChevronLeft size={20} className="rotate-180" />
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {step !== 'cpf' && step !== 'final' && step !== 'analysis' && step !== 'approved' && step !== 'dashboard' && step !== 'withdraw_options' && (
            <button 
              onClick={() => {
                if (step === 'pix_info') setStep('approved');
                else if (step === 'payment_day') setStep('simulation');
                else if (step === 'simulation') setStep('credit_status');
                else if (step === 'credit_status') setStep('details');
                else if (step === 'details') setStep('reason');
                else if (step === 'reason') setStep('user_data');
                else if (step === 'user_data') setStep('cpf');
              }}
              className="p-1 -ml-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="bg-bancred-blue p-1.5 rounded-lg">
              <Landmark size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Vaidabom</span>
          </div>
        </div>
        
        {step !== 'cpf' && step !== 'dashboard' && step !== 'withdraw_options' && (
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Passo {getStepNumber()} de 13</span>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                className="h-full bg-bancred-blue"
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={`flex-1 ${step === 'dashboard' || step === 'withdraw_options' ? 'p-6 pb-24' : 'p-6 pb-24'}`}>
        <AnimatePresence mode="wait">
          {step === 'cpf' && (
            <motion.div
              key="cpf"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step1_CPF onNext={(cpf, name, birthDate) => nextStep({ cpf, name, birthDate }, 'user_data')} />
            </motion.div>
          )}
          {step === 'user_data' && (
            <motion.div
              key="user_data"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step1_UserData 
                name={data.name} 
                birthDate={data.birthDate} 
                onNext={(phone, email) => nextStep({ phone, email }, 'reason')} 
              />
            </motion.div>
          )}
          {step === 'reason' && (
            <motion.div
              key="reason"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step2_Reason name={data.name} onNext={(reason) => nextStep({ reason }, 'details')} />
            </motion.div>
          )}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step2_Details onNext={(income, street, number, neighborhood, city, occupation) => nextStep({ income, street, number, neighborhood, city, occupation }, 'credit_status')} />
            </motion.div>
          )}
          {step === 'credit_status' && (
            <motion.div
              key="credit_status"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step_CreditStatus onNext={(creditStatus) => nextStep({ creditStatus }, 'simulation')} />
            </motion.div>
          )}
          {step === 'simulation' && (
            <motion.div
              key="simulation"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step3_Simulation 
                onBack={() => setStep('credit_status')}
                onNext={(amount, installments) => nextStep({ amount, installments }, 'payment_day')} 
              />
            </motion.div>
          )}
          {step === 'payment_day' && (
            <motion.div
              key="payment_day"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step_PaymentDay onNext={(paymentDay) => nextStep({ paymentDay }, 'analysis')} />
            </motion.div>
          )}
          {step === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step_Analysis onComplete={() => setStep('approved')} />
            </motion.div>
          )}
          {step === 'approved' && (
            <motion.div
              key="approved"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step_Approved 
                amount={data.amount} 
                installments={data.installments} 
                onNext={() => setStep('pix_info')} 
              />
            </motion.div>
          )}
          {step === 'pix_info' && (
            <motion.div
              key="pix_info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step_PixInfo onNext={(pixKey, bankName, pixKeyType) => nextStep({ pixKey, bankName, pixKeyType }, 'dashboard')} />
            </motion.div>
          )}
          {step === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Step_Dashboard 
                name={data.name || 'Cliente'} 
                amount={data.amount} 
                paymentDay={data.paymentDay || 10}
                onWithdraw={() => setStep('withdraw_options')} 
              />
            </motion.div>
          )}
          {step === 'withdraw_options' && (
            <motion.div
              key="withdraw_options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Step_WithdrawOptions 
                amount={data.amount}
                onNext={() => setStep('final')} 
              />
            </motion.div>
          )}
          {step === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Step4_Final name={data.name} amount={data.amount} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Social Proof */}
      <SocialProof />
    </div>
  );
}
