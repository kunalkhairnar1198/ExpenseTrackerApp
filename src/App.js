import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import Authpage from './component/Pages/Authpage';
import Profilepage from './component/Pages/Profilepage';
import UserProfileNotify from './component/Alert/UserProfileNotify';
import Expensetrackerpage from './component/Expensetracker/Expensetrackerpage';
import Forgotpass from './component/Pages/Forgotpass';
import { useContext } from 'react';
import { AuthContext } from './Store/auth-context';

function App() {
  const tokenCtx = useContext(AuthContext)
  console.log(tokenCtx)
  return (
    <>
        <Switch>
            <Route path='/' exact>
              <Layout/>
            </Route>
            <Route path='/authpage' >
              <Authpage/>
            </Route>
            <Route path='/profilepage' >
              <Profilepage/>
            </Route>
            <Route path='/userprofilenotify'>
              <UserProfileNotify/>
            </Route>
            <Route path='/expensepage'>
              <Expensetrackerpage/>
            </Route>
            <Route path='/resetpasspage'>
                <Forgotpass/>
            </Route>
        </Switch>
    </>
  );
}

export default App;
