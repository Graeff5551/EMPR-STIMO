import { useState, ChangeEvent } from 'react';
import { User, Phone, Mail, CheckCircle2 } from 'lucide-react';

interface Step1UserDataProps {
  name?: string;
  birthDate?: string;
  onNext: (phone: string, email: string) => void;
}

export function Step1_UserData({ name, birthDate, onNext }: Step1UserDataProps) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }
    return value;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const isPhoneValid = phone.replace(/\D/g, '').length === 11; // DDD + 9 digits
  const isEmailValid = email.includes('@') && email.includes('.');

  const canContinue = isPhoneValid && isEmailValid;

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-bancred-blue/10 text-bancred-blue rounded-full mb-4">
          <User size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Confirme seus dados</h2>
        <p className="text-slate-500">Encontramos seu cadastro! Agora complete com seu contato.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Nome Completo</label>
          <p className="text-slate-800 font-semibold">{name || 'Não informado'}</p>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Data de Nascimento</label>
          <p className="text-slate-800 font-semibold">{birthDate || 'Não informada'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Phone size={16} className="text-bancred-blue" />
            Celular (DDD + 9 dígitos)
          </label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
              isPhoneValid ? 'border-bancred-green focus:border-bancred-green' : 'border-slate-200 focus:border-bancred-blue'
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Mail size={16} className="text-bancred-blue" />
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
              isEmailValid ? 'border-bancred-green focus:border-bancred-green' : 'border-slate-200 focus:border-bancred-blue'
            }`}
          />
        </div>

        <button
          onClick={() => onNext(phone, email)}
          disabled={!canContinue}
          className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
        >
          <span>Confirmar e Continuar</span>
          <CheckCircle2 size={20} />
        </button>
      </div>
    </div>
  );
}
