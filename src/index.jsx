/* eslint-disable react/jsx-props-no-spreading */
import ReactDOM from 'react-dom';
import './index.css';
import { Provider, useSelector } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance,
} from 'redux-firestore';
import {
  getFirebase,
  isLoaded,
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import { Helmet } from 'react-helmet';
import rootReducer from './app/store/reducers/rootReducer';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import fbconfig from './app/config/firebaseConfig';
import CircularProgressIndicator from './app/components/other/circularProgressIndicator';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbconfig), // redux bindings for firestore
  ),
);

const rrfConfig = {
  userProfile: 'staff',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  presence: 'presence',
  sessions: 'sessions',
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) {
    return <CircularProgressIndicator />;
  }

  return children;
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <Helmet>
          <title>Event App</title>
        </Helmet>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
