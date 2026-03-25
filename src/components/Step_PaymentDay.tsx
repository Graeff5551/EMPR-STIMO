import { useState } from 'react';
import { Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

interface StepPaymentDayProps {
  onNext: (day: number) => void;
}

export function Step_PaymentDay({ onNext }: StepPaymentDayProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = [5, 10, 20];

  // Calculate the next month's date for the selected day
  const getNextMonthDate = (day: number) => {
    const today = new Date();
    let nextMonth = today.getMonth() + 1;
    let year = today.getFullYear();
    
    if (nextMonth > 11) {
      nextMonth = 0;
      year++;
    }
    
    return new Date(year, nextMonth, day).toLocaleDateString('pt-BR');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Data de Vencimento</h2>
      <p className="text-slate-500 mb-8 text-center">Qual o melhor dia para o vencimento da sua parcela?</p>

      <div className="grid grid-cols-1 gap-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`w-full p-6 bg-white border-2 rounded-2xl text-left transition-all flex items-center justify-between ${
              selectedDay === day ? 'border-bancred-blue bg-bancred-blue/5' : 'border-slate-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${selectedDay === day ? 'bg-bancred-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                <Calendar size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg">Dia {day}</p>
                <p className="text-xs text-slate-500">Primeira parcela para {getNextMonthDate(day)}</p>
              </div>
            </div>
            {selectedDay === day && <CheckCircle2 className="text-bancred-blue" size={24} />}
          </button>
        ))}

        <div className="bg-slate-50 p-4 rounded-xl mt-6">
          <p className="text-xs text-slate-500 leading-relaxed text-center">
            A primeira parcela fica para o dia escolhido do mês posterior ao que você está contratando o empréstimo.
          </p>
        </div>

        <button
          onClick={() => selectedDay && onNext(selectedDay)}
          disabled={!selectedDay}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg mt-4"
        >
          <span>Finalizar Proposta</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
