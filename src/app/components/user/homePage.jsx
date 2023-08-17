import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  Box,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import UpcomingTable from './homePageComponents/UpcomingTable';
import LiveTable from './homePageComponents/LiveTable';
import PageContainer from './homePageComponents/PageContainer';

/**
 * Home Page
 *
 * @component
 */
function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('upcoming');

  const createEvent = (
    id,
    title,
    subTitle,
    conductor,
    link,
    startingDateTime,
    endingDateTime,
    isTimer,
    isLive,
    isEnd,
  ) => ({
    id,
    title,
    subTitle,
    conductor,
    link,
    startingDateTime,
    endingDateTime,
    isTimer,
    isLive,
    isEnd,
  });

  useFirestoreConnect([
    { collection: 'events', orderBy: ['startingDateTime'] },
  ]);
  const eventsRaw = useSelector(state => state.firestore.ordered.events);

  if (!isLoaded(eventsRaw)) {
    return (
      <Box
        style={{ height: window.innerHeight }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  const upcomingEvents = [];
  const liveEvents = [];

  if (isLoaded(eventsRaw) && eventsRaw.length > 0) {
    eventsRaw.forEach(event => {
      if (!event.isEnd && !event.isLive) {
        upcomingEvents.push(
          createEvent(
            event.id,
            event.title,
            event.subTitle,
            event.conductor,
            event.link,
            event.startingDateTime,
            event.endingDateTime,
            event.isTimer,
            event.isLive,
            event.isEnd,
          ),
        );
      } else if (event.isLive && !event.isEnd) {
        liveEvents.push(
          createEvent(
            event.id,
            event.title,
            event.subTitle,
            event.conductor,
            event.link,
            event.startingDateTime,
            event.endingDateTime,
            event.isTimer,
            event.isLive,
            event.isEnd,
          ),
        );
      }
    });
  }

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const showEvents = () => {
    if (selectedCategory === 'current') {
      return <LiveTable liveEvents={liveEvents} />;
    }
    return <UpcomingTable upcomingEvents={upcomingEvents} />;
  };

  return (
    <PageContainer>
      <Typography
        component="h2"
        variant="h3"
        color="primary"
        gutterBottom
        align="center"
      >
        Events
      </Typography>
      <Tabs
        value={selectedCategory}
        onChange={handleCategoryChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab value="upcoming" label="Upcoming Events" />
        <Tab value="current" label="Current Events" />
      </Tabs>
      {showEvents()}
    </PageContainer>
  );
}

export default HomePage;
