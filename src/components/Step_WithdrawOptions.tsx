import { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Car, Home, AlertCircle, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StepWithdrawOptionsProps {
  amount: number;
  onNext: (option: string) => void;
}

export function Step_WithdrawOptions({ amount, onNext }: StepWithdrawOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Google Drive preview link is more reliable for embedding
  const videoSrc = "https://drive.google.com/file/d/1eO0ABCn3izwxeDbCZkG4GknvbazDgMvv/preview";

  return (
    <div className="max-w-md mx-auto pb-12">
      {/* Header Text */}
      <div className="text-center mb-8">
        <p className="text-slate-500 font-bold text-sm mb-4">Você está a apenas um passo de receber o valor solicitado</p>
        
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 mb-6 shadow-sm inline-block w-full">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">💰 Valor Aprovado</p>
          <p className="text-4xl font-black text-slate-800 mb-2">
            {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <div className="bg-green-50 text-green-700 text-[10px] font-bold py-1 px-3 rounded-full inline-block">
            Liberação imediata após definir garantia
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed px-4">
          Para finalizar, precisamos definir a modalidade de garantia. Assista ao vídeo abaixo e escolha a opção que melhor se adequa ao seu perfil.
        </p>
      </div>

      {/* Video Section */}
      <div className="relative aspect-video bg-black rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <iframe 
          src={videoSrc}
          className="w-full h-full border-0"
          allow="autoplay"
          title="Vídeo de Instrução"
        />
      </div>

      {/* Important Notice */}
      <div className="bg-orange-50 border border-orange-100 p-5 rounded-3xl flex gap-4 items-start mb-8">
        <div className="p-2 bg-orange-100 rounded-xl shrink-0">
          <AlertCircle size={20} className="text-orange-600" />
        </div>
        <p className="text-xs text-orange-900 leading-relaxed">
          <span className="font-bold">Importante:</span> Existe uma alternativa de empréstimo sem a necessidade de contratar um <span className="font-bold">seguro prestamista</span>: você pode optar pela <span className="font-bold">alienação de um bem</span>, como veículos ou imóveis. Para essa opção, será necessário agendar um atendimento presencial em uma de nossas unidades.
        </p>
      </div>

      <h3 className="font-bold text-slate-800 mb-6 text-lg">Escolha como deseja prosseguir:</h3>

      <div className="space-y-4">
        {/* Option 1: Seguro Prestamista */}
        <button
          onClick={() => setSelectedOption('seguro')}
          className={`w-full p-6 bg-white border-2 rounded-3xl text-left transition-all relative overflow-hidden ${
            selectedOption === 'seguro' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${selectedOption === 'seguro' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
              <ShieldCheck size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-slate-800">Seguro Prestamista</p>
                <span className="bg-green-100 text-green-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-full">Recomendado</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[10px] text-slate-500">
                  <ShieldCheck size={12} className="text-green-500" />
                  Liberação imediata do valor total
                </li>
                <li className="flex items-center gap-2 text-[10px] text-slate-500">
                  <ShieldCheck size={12} className="text-green-500" />
                  Devolução 100% do valor do seguro
                </li>
                <li className="flex items-center gap-2 text-[10px] text-slate-500">
                  <ShieldCheck size={12} className="text-green-500" />
                  Sem necessidade de avaliação presencial
                </li>
              </ul>
              <p className="mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-wider">Processo 100% digital • Receba hoje mesmo</p>
            </div>
          </div>
        </button>

        {/* Option 2: Garantia */}
        <button
          onClick={() => setSelectedOption('garantia')}
          className={`w-full p-6 bg-white border-2 rounded-3xl text-left transition-all ${
            selectedOption === 'garantia' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${selectedOption === 'garantia' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
              <div className="flex gap-1">
                <Car size={16} />
                <Home size={16} />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800 mb-2">Veículo ou Imóvel como Garantia</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[10px] text-slate-500">
                  <AlertCircle size={12} className="text-orange-500" />
                  Processo pode levar até 7 dias úteis
                </li>
                <li className="flex items-center gap-2 text-[10px] text-slate-500">
                  <AlertCircle size={12} className="text-orange-500" />
                  Necessária avaliação presencial do bem
                </li>
                <li className="flex items-center gap-2 text-[10px] text-slate-500">
                  <AlertCircle size={12} className="text-orange-500" />
                  Documentação adicional exigida
                </li>
              </ul>
              <p className="mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-wider">Processo presencial • Sujeito a aprovação</p>
            </div>
          </div>
        </button>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => selectedOption && onNext(selectedOption)}
        disabled={!selectedOption}
        className={`w-full py-5 rounded-2xl font-bold text-lg mt-10 flex items-center justify-center gap-2 transition-all ${
          selectedOption 
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' 
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        <span>{selectedOption ? 'Continuar com ' + (selectedOption === 'seguro' ? 'Seguro' : 'Garantia') : 'Selecione uma opção para continuar'}</span>
        {selectedOption && <ChevronRight size={20} />}
      </button>
    </div>
  );
}
