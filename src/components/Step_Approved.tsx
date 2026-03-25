import { CheckCircle2, ChevronRight, MapPin, ClipboardCheck, Wallet } from 'lucide-react';

interface StepApprovedProps {
  amount: number;
  installments: number;
  onNext: () => void;
}

export function Step_Approved({ amount, installments, onNext }: StepApprovedProps) {
  const installmentValue = (amount * 1.15) / installments;

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Crédito Aprovado!</h2>
        <p className="text-slate-500">Parabéns! Sua análise foi concluída com sucesso.</p>
      </div>

      <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Valor Liberado</span>
          <span className="text-2xl font-bold text-slate-800">
            {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Parcelas</span>
          <span className="text-lg font-bold text-slate-800">
            {installments}x de {installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
          <span className="w-1.5 h-6 bg-bancred-blue rounded-full" />
          Próximos Passos
        </h3>
        
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <ClipboardCheck size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Finalize seu cadastro na plataforma</p>
              <p className="text-xs text-slate-500">Confirme seus dados para gerar o contrato digital.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Informe endereço para receber carnê</p>
              <p className="text-xs text-slate-500">O carnê físico será enviado pelos Correios.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Wallet size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">O valor será transferido via Pix</p>
              <p className="text-xs text-slate-500">Receba o dinheiro na sua conta em poucos minutos.</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg"
      >
        <span>Continuar</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
