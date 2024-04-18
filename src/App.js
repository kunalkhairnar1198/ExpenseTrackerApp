import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import Authpage from './component/Pages/Authpage';
import Home from './component/Pages/Home';

function App() {
  return (
    <>
     <Layout>
        <Switch>
            <Route path='/' exact>
              <Home/>
            </Route>
            <Route path='/Authpage'>
              <Authpage/>
            </Route>
        </Switch>
      </Layout>

    </>
  );
}

export default App;
