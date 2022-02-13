 
import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
/* import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login' */
import Alert from "./components/layout/Alert";
import Register from './components/auth/Register'
import setAuthToken  from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'

//neum components
import NeuLogin from './components/auth/NeuLogin'
import NeuNavbar from './components/layout/NeuNavbar'

//

//redux import
import { Provider } from 'react-redux'
import store from './store'
//

const App = () =>  {
  //const [count, setCount] = useState(0)

  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store} >
      <Router>
      
        {/* <Navbar/> */}
        <NeuNavbar/>
        <Route exact path={"/"} component={Landing}/>
        
        <section className="container">
          <Alert/>
          <Switch>
            {/* <Route exact path={"/login"} component={Login}/> */}
            <Route exact path={"/login"} component={NeuLogin}/>
            
            <Route exact path={"/register"} component={Register}/>
            <PrivateRoute exact path={"/dashboard"} component={Dashboard}/>
            <PrivateRoute exact path={"/create-profile"} component={CreateProfile}/>
            <PrivateRoute exact path={"/edit-profile"} component={EditProfile} />
            <PrivateRoute exact path={"/add-experience"} component={AddExperience} />
            <PrivateRoute exact path={"/add-education"} component={AddEducation} />
          </Switch>
        </section>
        
      </Router>
    </Provider>
  )
}

export default App
