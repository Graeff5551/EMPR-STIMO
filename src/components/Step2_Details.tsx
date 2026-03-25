import { useState, ChangeEvent } from 'react';
import { Briefcase, DollarSign, MapPin, ChevronRight } from 'lucide-react';

interface StepDetailsProps {
  onNext: (income: string, street: string, number: string, neighborhood: string, city: string, occupation: string) => void;
}

const OCCUPATIONS = [
  'Assalariado CLT',
  'Servidor público',
  'Autônomo',
  'Empresário / MEI',
  'Aposentado',
  'Desempregado',
  'Dona de casa',
  'Estudante',
  'Outro'
];

export function Step2_Details({ onNext }: StepDetailsProps) {
  const [income, setIncome] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');

  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const amount = parseInt(digits) / 100;
    if (isNaN(amount)) return '';
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleIncomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setIncome(formatted);
  };

  const isValid = income.length > 0 && 
                  street.length > 2 && 
                  number.length > 0 && 
                  neighborhood.length > 2 && 
                  city.length > 2 && 
                  occupation.length > 0;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Dados Adicionais</h2>
      <p className="text-slate-500 mb-8 text-center">Precisamos de mais algumas informações para sua análise</p>

      <div className="space-y-6">
        {/* Occupation */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Briefcase size={18} className="text-bancred-blue" />
            Ocupação
          </label>
          <div className="grid grid-cols-1 gap-2">
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors appearance-none"
            >
              <option value="">Selecione sua ocupação</option>
              {OCCUPATIONS.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Income */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <DollarSign size={18} className="text-bancred-blue" />
            Renda Mensal
          </label>
          <input
            type="text"
            value={income}
            onChange={handleIncomeChange}
            placeholder="R$ 0,00"
            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors"
          />
        </div>

        {/* Address */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
            <MapPin size={18} className="text-bancred-blue" />
            Endereço Residencial
          </label>
          
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3">
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Rua / Logradouro"
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Nº"
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Bairro"
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Cidade"
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={() => onNext(income, street, number, neighborhood, city, occupation)}
          disabled={!isValid}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg mt-4"
        >
          <span>Continuar</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
