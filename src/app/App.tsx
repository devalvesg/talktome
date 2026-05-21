/**
 * Bootstrap da SPA: providers globais + roteamento das telas.
 * As telas usam estado local/mock no M2; o canal de sessão real entra no M3.
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from '@/ds/components';
import { Landing } from '@/features/landing/Landing';
import { Home } from '@/features/home/Home';
import { Attendant } from '@/features/attendant/Attendant';
import { Client } from '@/features/client/Client';
import { Showcase } from '@/features/showcase/Showcase';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/atendente" element={<Attendant />} />
          <Route path="/cliente" element={<Client />} />
          <Route path="/showcase" element={<Showcase />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
