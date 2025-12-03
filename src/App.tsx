import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/Home";
import { Catalogo } from "@/pages/Catalogo";
import { LivroDetalhe } from "@/pages/LivroDetalhe";

function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="catalogo/:id" element={<LivroDetalhe />} />
          <Route path="*" element={<div className="p-10 text-center">Página não encontrada</div>} />
        </Route>
      </Routes>

      {/* Toaster fica fora das rotas para persistir mensagens */}
      <Toaster
        position="top-center"
        richColors
        closeButton
        theme={theme as "light" | "dark"}
      />
    </BrowserRouter>
  );
}

export default App;