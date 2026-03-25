export interface LoanData {
  cpf: string;
  name?: string;
  birthDate?: string;
  phone: string;
  email: string;
  reason: string;
  income?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  occupation?: string;
  creditStatus?: 'negative' | 'clean';
  paymentDay?: number;
  pixKey?: string;
  bankName?: string;
  pixKeyType?: string;
  amount: number;
  installments: number;
}

export type Step = 'cpf' | 'user_data' | 'reason' | 'details' | 'credit_status' | 'simulation' | 'payment_day' | 'analysis' | 'approved' | 'pix_info' | 'dashboard' | 'withdraw_options' | 'final';

export const REASONS = [
  { id: 'debts', label: 'Quitar dívidas', icon: 'CreditCard' },
  { id: 'medical', label: 'Emergência médica', icon: 'Stethoscope' },
  { id: 'business', label: 'Meu negócio', icon: 'Briefcase' },
  { id: 'home', label: 'Reformar casa', icon: 'Home' },
  { id: 'vehicle', label: 'Comprar veículo', icon: 'Car' },
  { id: 'others', label: 'Outros motivos', icon: 'PlusCircle' },
];

export const INSTALLMENT_OPTIONS = [12, 24, 36, 48];
