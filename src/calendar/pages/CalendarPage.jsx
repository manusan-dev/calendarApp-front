import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEventBox, NavBar, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks/useUIStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 1.2,
      color: 'white',
    }

    return {
      style,
    } 
  };

  const onDoubleClick = (event) => {
    // console.log({ doubleclick: event });
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={
          { event: CalendarEventBox }
        }
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        defaultView={lastView}
      />
      <CalendarModal />
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
