import React from 'react';
import { CalendarFilters } from './partials/calendar-filters/insex';
import './styles.scss';
import { Calendar } from './partials/calendar';
import { Grid } from '@material-ui/core';

type RootPageViewProps = {
  currentModal: React.ReactNode;
};

const BASE_CLASS = 'c-root-page';
const GRID_CLASS = BASE_CLASS + '__grid';

export const RootPageView = (props: RootPageViewProps) => (
  <div className={BASE_CLASS}>
    {props.currentModal}
    <Grid container className={GRID_CLASS}>
      <Grid item xs={3}>
        <CalendarFilters />
      </Grid>
      <Grid item xs={9}>
        <Calendar />
      </Grid>
    </Grid>
  </div>
);
