import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SideBar from './components/SideBar'
import ChatBar from "./components/ChatBar";
import Login from './components/Login'
import { useStateValue } from './StateProvider';
function App() {
  // get the user information from the stateProviver 
  const [{ user }] = useStateValue()
  console.log(user)
  return !user ? (
    <div className="App"><Login /></div>) : (
    <Router>
    <div className="App">
      <section className="App-body">
          < SideBar />
          <Switch>
            <Route path="/rooms/:roomId" >
                < ChatBar />
            </Route>
            <Route path="/" >
                < ChatBar />
            </Route>
          </Switch>
      </section>
     
      </div>
      </Router>
  );
}

export default App;
