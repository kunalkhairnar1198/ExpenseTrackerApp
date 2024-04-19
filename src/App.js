import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import Authpage from './component/Pages/Authpage';
import Profilepage from './component/Pages/Profilepage';

function App() {
  return (
    <>
        <Switch>
            <Route path='/' exact>
              <Layout/>
            </Route>
            <Route path='/authpage' exact>
              <Authpage/>
            </Route>
            <Route path='/profilepage' exact>
              <Profilepage/>
            </Route>
        </Switch>
    </>
  );
}

export default App;
