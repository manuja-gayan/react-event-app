import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';

/**
 * App component
 *
 * @component
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/404" render={() => <p>404 not found</p>} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/" component={UserRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
