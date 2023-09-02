import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Explorer from "./pages/Explorer"
import SmartContracts from "./pages/SmartContracts"
import Dapps from "./pages/Dapps"
import NotFound from "./pages/NotFound"
import { CssBaseline } from "@mui/material"

function App() {
  return (
    <CssBaseline>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={ <Home />} />
        <Route path='/explorer' element={ <Explorer />} />
        <Route path='/smartcontracts' element={ <SmartContracts />} />
        <Route path='/dapps' element={ <Dapps />} />
        <Route path='*' element={ <NotFound />} />
      </Routes>
    </BrowserRouter>
    </CssBaseline>
  )
}

export default App
