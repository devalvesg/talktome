/**
 * Durante o M1, a raiz renderiza o showcase do Design System (checkpoint).
 * No M2 isto vira o roteamento das telas (landing/home/attendant/client).
 */
import { ToastProvider } from '@/ds/components';
import { Showcase } from '@/features/showcase/Showcase';

function App() {
  return (
    <ToastProvider>
      <Showcase />
    </ToastProvider>
  );
}

export default App;
