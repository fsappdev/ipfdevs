 
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'


const App = () =>  {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      
      <Navbar/>
      <Route exact path={"/"} component={Landing}/>
      
      <section className="container">
        <Switch>
          <Route exact path={"/login"} component={Login}/>
          <Route exact path={"/register"} component={Register}/>
        </Switch>
      </section>

   
    </Router>
  )
}

export default App
