import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AdminDashboard } from './components/adminDashboard/AdminDashboard'
import { LoginPage } from './components/login/LoginPage'
import { MainPage } from './components/mainPage/MainPage'
import { AuthorPage } from './components/AuthorPage/AuthorPage'
import { Profile } from './components/profile/Profile'

function App() {

  return (
    <div style = {{ height: '100vh', width : '100vw'}}>
      <Routes>
        <Route path={"/signup"} element={<LoginPage loginAction={"signup"}/>} />
        <Route path={"/signin"} element={<LoginPage loginAction={"signin"}/>} />
        <Route index path={"/"} element={<MainPage/>}/>
        <Route path={"/admin"} element={<AdminDashboard/>}/>
        <Route index path={"/author"} element={<AuthorPage view={"courses"}/>}/>
        <Route path={"/author/courses"} element={<AuthorPage view={"courses"}/>}/>
        <Route path={"/author/addCourse"} element={<AuthorPage view={"addCourse"}/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
