import { useState, ChangeEvent } from 'react';
import { Landmark, Loader2, AlertCircle } from 'lucide-react';

interface Step1Props {
  onNext: (cpf: string, name?: string, birthDate?: string) => void;
}

export function Step1_CPF({ onNext }: Step1Props) {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    setError(null);
  };

  const handleConsult = async () => {
    setLoading(true);
    setError(null);
    const cleanCpf = cpf.replace(/\D/g, '');
    
    try {
      const response = await fetch(`/api/consulta-cpf?cpf=${cleanCpf}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      const responseText = await response.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Parse error:', responseText);
        throw new Error('O servidor retornou uma resposta inválida. Isso pode ser um erro temporário na Vercel ou na API de CPF.');
      }

      console.log('API Response:', data);

      if (!response.ok || data.error || data.status === 'error') {
        const rawMsg = data.error || data.message || 'Erro ao consultar CPF.';
        let finalMsg = typeof rawMsg === 'object' ? JSON.stringify(rawMsg) : String(rawMsg);
        
        // Try to parse if it's a JSON string like {"code":"500", "message":"..."}
        if (finalMsg.startsWith('{')) {
          try {
            const parsed = JSON.parse(finalMsg);
            finalMsg = parsed.message || parsed.error || finalMsg;
          } catch (e) { /* ignore */ }
        }
        
        throw new Error(finalMsg);
      }
      
      // Try multiple common field names for name and birth date
      const name = data.nome || data.name || data.full_name || data.nome_completo || '';
      const birthDate = data.data_nascimento || data.birthDate || data.nascimento || data.data_nasc || '';

      if (!name) {
        throw new Error('CPF não encontrado ou dados incompletos.');
      }

      onNext(cpf, name, birthDate);
    } catch (err) {
      console.error('API Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      
      // If it's a validation error or "not found", we can offer a fallback for testing
      if (errorMessage.includes('inválido') || errorMessage.includes('não encontrado') || errorMessage.includes('incompletos')) {
        // We'll show the error but allow a "Demo Mode" if they click again or show a specific button
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    // Fallback data for testing purposes
    onNext(cpf, 'Usuário de Teste Bancred', '01/01/1990');
  };

  const isValid = cpf.length === 14;

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-bancred-blue p-3 rounded-2xl mb-4 shadow-lg shadow-bancred-blue/20">
          <Landmark size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Bancred</h1>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">Vamos começar sua análise</h2>
      <p className="text-slate-500 mb-8">Informe seu CPF para começar</p>

      <div className="w-full space-y-4">
        <div className="relative">
          <input
            type="text"
            value={cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            disabled={loading}
            className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:border-bancred-blue focus:outline-none transition-colors text-center font-mono tracking-widest ${
              error ? 'border-red-300 bg-red-50' : 'border-slate-200'
            }`}
          />
        </div>

        {error && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
              <AlertCircle size={18} />
              <span className="text-left">{error}</span>
            </div>
            
            <button
              onClick={handleDemoMode}
              className="w-full text-sm text-bancred-blue font-bold hover:underline py-2 bg-slate-50 rounded-lg border border-slate-200"
            >
              Continuar com dados de teste (Modo Demo)
            </button>
          </div>
        )}

        <button
          onClick={handleConsult}
          disabled={!isValid || loading}
          className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <span>Consultando...</span>
            </>
          ) : (
            <span>Continuar</span>
          )}
        </button>
      </div>
    </div>
  );
}
