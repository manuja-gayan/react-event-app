import { Helmet } from 'react-helmet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import SignIn from '../components/admin/SignIn';
import ResetPassword from '../components/admin/staffComponents/resetPassword';
import Error404 from '../components/other/404';

/**
 * Admin routes
 *
 * @component
 */
function AdminRoutes() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>Admin | Event App</title>
      </Helmet>
      <Switch>
        <Route path={`${path}/login`} component={SignIn} exact />
        <Route
          path={`${path}/reset-password`}
          component={ResetPassword}
          exact
        />
        <Route path={`${path}/`} component={Dashboard} exact />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default AdminRoutes;
