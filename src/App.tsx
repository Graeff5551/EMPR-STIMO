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

  return (
    <div className="min-h-screen flex flex-col">
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
            <span className="font-bold text-xl tracking-tight text-slate-800">Bancred</span>
          </div>
        </div>
        
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
              <Step4_Final name={data.name} amount={data.amount} cpf={data.cpf} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Social Proof */}
      <SocialProof />
    </div>
  );
}
