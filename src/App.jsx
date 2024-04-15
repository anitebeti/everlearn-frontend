import './App.css'
import ResponsiveDrawer from './components/drawer/ResponsiveDrawer'
import { SignIn } from './components/login/SignIn'

function App() {

  return (
    <div style = {{ height: '100vh', width : '100vw'}}>
      <ResponsiveDrawer/>
      {/* <SignIn/> */}

    </div>
  )
}

export default App
