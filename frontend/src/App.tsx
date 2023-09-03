import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Explorer from "./pages/Explorer"
import SmartContracts from "./pages/SmartContracts"
import Dapps from "./pages/Dapps"
import Block from "./pages/Block"
import Transaction from "./pages/Transaction"
import NotFound from "./pages/NotFound"
import { CssBaseline } from "@mui/material"
import './styles/global.css'

function App() {
  return (
    <CssBaseline>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={ <Home />} />
        <Route path='/explorer' element={ <Explorer />} />
        <Route path='/smartcontracts' element={ <SmartContracts />} />
        <Route path='/dapps' element={ <Dapps />} />
        <Route path='/block' element={ <Block />} />
        <Route path='/transaction' element={ <Transaction />} />
        <Route path='*' element={ <NotFound />} />
      </Routes>
    </BrowserRouter>
    </CssBaseline>
  )
}

export default App
