import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Backdrop, Button, makeStyles, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  People as GuestIcon,
  SupervisorAccount as StaffIcon,
  EventAvailable as EventIcon,
  QuestionAnswer as QnAIcon,
} from '@material-ui/icons';
import { isLoaded } from 'react-redux-firebase';
import Navbar from './Navbar';
import Copyright from '../other/Copyright';
import Events from './eventComponents/Events';
import Staff from './staffComponents/Staff';
import Guests from './guestComponents/Guests';
import QA from './QAComponents/QA';
import { logout } from '../../store/actions/authActions';
import CircularProgressIndicator from '../other/circularProgressIndicator';
import AccountDisabled from './AccountDisabled';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  backdrop: {
    zIndex: '10000',
    backgroundColor: 'rgb(0,0,0,0.95)',
    color: 'rgb(255,255,255)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const createChild = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getAuthorizedViews = currentUser => {
  const children = [];
  if (currentUser.eventAccess)
    children.push(createChild('Events', <EventIcon />, <Events />));
  if (currentUser.staffAccess)
    children.push(createChild('Staff', <StaffIcon />, <Staff />));
  if (currentUser.guestAccess)
    children.push(createChild('Guests', <GuestIcon />, <Guests />));
  if (currentUser.questionAccess)
    children.push(createChild('QnA', <QnAIcon />, <QA />));
  return children;
};

/**
 * Dashboard
 *
 * @component
 */
export default function Dashboard() {
  const classes = useStyles();
  const [overlay, setOverlay] = useState(false);
  const [currentChildIndex, setcurrentChildIndex] = useState(0);
  const auth = useSelector(state => state.firebase.auth);
  const currentUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setOverlay(window.innerWidth < 1100);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [currentUser]);

  if (!auth.uid) return <Redirect to="/admin/login" />;

  if (!isLoaded(currentUser)) {
    return <CircularProgressIndicator boxHeight={window.innerHeight / 2} />;
  }

  if (currentUser.isDisabled) {
    return <AccountDisabled />;
  }

  const children = getAuthorizedViews(currentUser);
  const currentChild = children[currentChildIndex];
  const handleChildChange = i => {
    setcurrentChildIndex(i);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar onListItemClick={handleChildChange} items={children} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {currentChild && currentChild.component}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      <Backdrop open={overlay} className={classes.backdrop}>
        <Typography align="center">
          This Admin Dashboard needs window size to be greater than 1100px
        </Typography>
        <Button
          align="center"
          color="secondary"
          variant="contained"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
        <br />
      </Backdrop>
    </div>
  );
}
