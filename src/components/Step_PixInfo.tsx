import { useState } from 'react';
import { Landmark, Key, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StepPixInfoProps {
  onNext: (pixKey: string, bankName: string, pixKeyType: string) => void;
}

const BANKS = [
  'Nubank',
  'Banco do Brasil',
  'Itaú',
  'Bradesco',
  'Santander',
  'Inter',
  'C6 Bank',
  'Caixa Econômica',
  'PicPay',
  'Mercado Pago',
  'PagBank',
  'BTG Pactual'
];

const PIX_TYPES = [
  { id: 'cpf', label: 'CPF' },
  { id: 'email', label: 'E-mail' },
  { id: 'phone', label: 'Telefone' },
  { id: 'random', label: 'Chave Aleatória' }
];

export function Step_PixInfo({ onNext }: StepPixInfoProps) {
  const [pixKey, setPixKey] = useState('');
  const [bankName, setBankName] = useState('');
  const [pixKeyType, setPixKeyType] = useState('');
  const [showBanks, setShowBanks] = useState(false);

  const filteredBanks = bankName.length > 0 
    ? BANKS.filter(b => b.toLowerCase().includes(bankName.toLowerCase()))
    : [];

  const isValid = pixKey.length > 5 && bankName.length > 2 && pixKeyType.length > 0;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Dados para Recebimento</h2>
      <p className="text-slate-500 mb-8 text-center">Informe onde você deseja receber o valor do seu empréstimo</p>

      <div className="space-y-6">
        {/* Pix Key Type */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Key size={18} className="text-bancred-blue" />
            Tipo de Chave Pix
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PIX_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setPixKeyType(type.id)}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                  pixKeyType === type.id ? 'border-bancred-blue bg-bancred-blue/5 text-bancred-blue' : 'border-slate-100 text-slate-500'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pix Key */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-bancred-blue" />
            Sua Chave Pix
          </label>
          <input
            type="text"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder="Digite sua chave pix aqui"
            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors"
          />
          <div className="mt-3 bg-amber-50 p-3 rounded-xl flex gap-2 items-start">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 leading-relaxed font-bold uppercase tracking-tight">
              A chave Pix precisa obrigatoriamente estar vinculada ao CPF do titular do empréstimo.
            </p>
          </div>
        </div>

        {/* Bank Name */}
        <div className="relative">
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Landmark size={18} className="text-bancred-blue" />
            Nome do Banco
          </label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => {
              setBankName(e.target.value);
              setShowBanks(true);
            }}
            onFocus={() => setShowBanks(true)}
            placeholder="Ex: Nubank, Itaú..."
            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors"
          />
          
          {showBanks && filteredBanks.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-100 rounded-2xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
              {filteredBanks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => {
                    setBankName(bank);
                    setShowBanks(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                >
                  {bank}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onNext(pixKey, bankName, pixKeyType)}
          disabled={!isValid}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg mt-4"
        >
          <span>Finalizar Cadastro</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
