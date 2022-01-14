 
import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Alert from "./components/layout/Alert";
import Register from './components/auth/Register'
import setAuthToken  from './utils/setAuthToken'
import { loadUser } from './actions/auth'
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
      
        <Navbar/>
        <Route exact path={"/"} component={Landing}/>
        
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path={"/login"} component={Login}/>
            <Route exact path={"/register"} component={Register}/>
          </Switch>
        </section>

      </Router>
    </Provider>
  )
}

export default App
