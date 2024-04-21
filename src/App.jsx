import './App.css'
import { AdminDashboard } from './components/adminDashboard/AdminDashboard'
import { SignIn } from './components/login/SignIn'
import { MainPage } from './components/mainPage/MainPage'

function App() {

  return (
    <div style = {{ height: '100vh', width : '100vw'}}>

      {/* <MainPage/> */}
      {/* <SignIn/> */}
      <AdminDashboard/>

    </div>
  )
}

export default App
