import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { runs, trackingData } from './mock-data';
import Sidebar from '../experiment-tracking/sidebar';
import Details from '../experiment-tracking/details';

/**
 * Main experiment tracking page container. Handles showing/hiding the sidebar
 * nav for experiment tracking and the display of the experiment details
 * single / comparison view.
 */
const ExperimentWrapper = () => (
  <>
    <Sidebar data={runs} />
    <Switch>
      <Route path={['/runsList/:id', '/runsList']}>
        <Details runs={runs} trackingData={trackingData} />
      </Route>
    </Switch>
  </>
);

export default ExperimentWrapper;
