import type { Option } from './types';

/**
 * Catálogo canônico das ações rápidas do atendente.
 *
 * Fonte da verdade: docs/Design System.md#Catálogo de ações rápidas +
 * screens-shared.jsx. IDs, textos, ícones e respostas são PARTE DO PRODUTO —
 * não alterar sem atualizar a nota do DS. Congelado após o M1.
 *
 * `icon` referencia um nome do conjunto em ds/components/Icon.tsx.
 */
export interface QuickAction {
  id: string;
  /** Pergunta exibida ao atendente e sinalizada ao cliente. */
  text: string;
  /** Nome do ícone (ver IconName em Icon.tsx). */
  icon: string;
  /** Respostas que o cliente pode escolher. */
  options: Option[];
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'cpf',
    text: 'CPF na nota?',
    icon: 'doc',
    options: [
      { value: 'sim', label: 'Sim', icon: 'check' },
      { value: 'nao', label: 'Não', icon: 'x' },
    ],
  },
  {
    id: 'pay',
    text: 'Crédito ou débito?',
    icon: 'card',
    options: [
      { value: 'cred', label: 'Crédito', icon: 'card' },
      { value: 'deb', label: 'Débito', icon: 'card' },
    ],
  },
  {
    id: 'bag',
    text: 'Aceita sacola?',
    icon: 'bag',
    options: [
      { value: 'sim', label: 'Sim', icon: 'check' },
      { value: 'nao', label: 'Não', icon: 'x' },
    ],
  },
  {
    id: 'help',
    text: 'Precisa de ajuda?',
    icon: 'help',
    options: [
      { value: 'sim', label: 'Sim, preciso', icon: 'check' },
      { value: 'nao', label: 'Não, obrigado', icon: 'x' },
    ],
  },
  {
    id: 'cancel',
    text: 'Deseja cancelar?',
    icon: 'cancel',
    options: [
      { value: 'sim', label: 'Sim', icon: 'check' },
      { value: 'nao', label: 'Não', icon: 'x' },
    ],
  },
  {
    id: 'value',
    text: 'Confirmar valor R$ 87,40?',
    icon: 'money',
    options: [
      { value: 'sim', label: 'Sim, confirmo', icon: 'check' },
      { value: 'nao', label: 'Não', icon: 'x' },
    ],
  },
  {
    id: 'receipt',
    text: 'Comprovante?',
    icon: 'print',
    options: [
      { value: 'imp', label: 'Impresso', icon: 'print' },
      { value: 'dig', label: 'Digital', icon: 'phone' },
    ],
  },
  {
    id: 'paymethod',
    text: 'Forma de pagamento?',
    icon: 'money',
    options: [
      { value: 'pix', label: 'PIX', icon: 'sparkle' },
      { value: 'card', label: 'Cartão', icon: 'card' },
      { value: 'din', label: 'Dinheiro', icon: 'money' },
    ],
  },
];
