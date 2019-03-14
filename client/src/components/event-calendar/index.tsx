import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar, {
  Navigate,
  stringOrDate,
  View,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import React from 'react';

const localizer = BigCalendar.momentLocalizer(moment);

type EventCalendarProps = {
  view: View;
  views: Views;
  events: { start: Date; end: Date; title: string }[];
  onNavigate?: (newDate: Date, view: View, action: Navigate) => void;
  onView?: (view: View) => void;
  date: Date;
  selectable?: boolean;
  onSelectSlot?: (slotInfo: {
    start: stringOrDate;
    end: stringOrDate;
    slots: Date[] | string[];
    action: 'select' | 'click' | 'doubleClick';
  }) => void;
  onSelectEvent?: (event: any) => void;
};

export const EventCalendar = (props: EventCalendarProps) => {
  return <BigCalendar localizer={localizer} {...props} />;
};

export type CalendarViewTypes = View;
export const CalendarViewType: { [key: string]: View } = {
  MONTH: 'month',
  WEEK: 'week',
  WORK_WEEK: 'work_week',
  DAY: 'day',
  AGENDA: 'agenda',
};
