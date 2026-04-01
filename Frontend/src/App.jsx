import { Routes, Route } from "react-router-dom"
import Login from "./page/login"
import Signup from "./page/Register"
import HomePage from "./page/HomePage"
import Protected from "./layout/protected"

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes — wrap inside Protected */}
      <Route element={<Protected />}>
        <Route path="/" element={<HomePage />} />
      
      </Route>
    </Routes>
  )
}

export default App