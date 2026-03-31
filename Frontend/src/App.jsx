import { Routes,Route } from "react-router-dom"
import Login from "./page/login"
import Signup from "./page/Register"
import HomePage from "./page/HomePage"

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>

    </>
  )
}

export default App
