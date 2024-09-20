import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"

const App = () => {
  return (
    // <div>Ayyappa!!</div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
