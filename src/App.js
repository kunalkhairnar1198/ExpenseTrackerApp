import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import Authpage from './component/Pages/Authpage';
import Profilepage from './component/Pages/Profilepage';
import UserProfileNotify from './component/Alert/UserProfileNotify';
import Expensetrackerpage from './component/Expensetracker/Expensetrackerpage';
import Forgotpass from './component/Pages/Forgotpass';
import { useSelector } from 'react-redux';

function App() {

    const isAuth = useSelector(state => state.auth.isAuthenticated)
    console.log(isAuth)  
  return (
    <>
        <Switch>
            <Route path='/' exact>
              {!isAuth ? <Layout/> : <Expensetrackerpage/>}
            </Route>
            <Route path='/authpage' >
              <Authpage/>
            </Route>
            {isAuth && <Route path='/profilepage' >
              <Profilepage/>
            </Route>}
            {isAuth && <Route path='/userprofilenotify'>
              <UserProfileNotify/>
            </Route>}
            {isAuth && <Route path='/expensepage'>
              <Expensetrackerpage/>
            </Route>}
            <Route path='/resetpasspage'>
                <Forgotpass/>
            </Route>
        </Switch>
    </>
  );
}

export default App;
