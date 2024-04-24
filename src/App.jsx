import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AdminDashboard } from './components/adminDashboard/AdminDashboard'
import { LoginPage } from './components/login/LoginPage'
import { MainPage } from './components/mainPage/MainPage'

function App() {

  return (
    <div style = {{ height: '100vh', width : '100vw'}}>
      <Routes>
        <Route path={"/signup"} element={<LoginPage loginAction={"signup"}/>} />
        <Route path={"/signin"} element={<LoginPage loginAction={"signin"}/>} />
        <Route index path={"/"} element={<MainPage/>} /> 
      </Routes>

      {/* <AdminDashboard/> */}

    </div>
  )
}

export default App
