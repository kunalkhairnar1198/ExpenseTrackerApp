import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import Authpage from './component/Pages/Authpage';

function App() {
  return (
    <>
     <Layout>
        <Switch>
            <Route path='/'>
              <Authpage/>
            </Route>
        </Switch>
      </Layout>

    </>
  );
}

export default App;
