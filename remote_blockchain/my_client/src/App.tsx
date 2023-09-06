import { BrowserRouter, Routers, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound";

export default function App() {

  return (
    <BrowserRouter>
      <div>
        <main style={{ heigh: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Routes>
            <Route path='/' element={ <Room />} />
            <Route path='/admin' element={ <Admin />} />
            <Route path='*' element={ <NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}