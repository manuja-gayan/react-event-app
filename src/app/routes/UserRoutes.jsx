import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import EventPage from '../components/user/eventPage';
import HomePage from '../components/user/homePage';
import Error404 from '../components/other/404';
import UserConsentPage from '../components/user/userConsentPage';

/**
 * User routes
 *
 * @component
 */
function UserRoutes() {
  const [consent, setConsent] = useState(localStorage.getItem('consent'));

  const onContinue = () => {
    localStorage.setItem('consent', true);
    setConsent(true);
  };

  const onCancel = () => {
    window.location = 'https://www.google.com';
  };
  return (
    <Switch>
      {!consent && (
        <Route path="/">
          <UserConsentPage onCancel={onCancel} onContinue={onContinue} />
        </Route>
      )}
      <Route path="/" component={HomePage} exact />
      <Route path="/event/:id" component={EventPage} />
      <Route component={Error404} />
    </Switch>
  );
}

export default UserRoutes;
