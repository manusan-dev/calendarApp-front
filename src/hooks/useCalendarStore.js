import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);

    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        
        console.log('guardando evento:', calendarEvent.id);

        try {

            if (calendarEvent.id) {

                await calendarApi.put(`/events/${calendarEvent.id}`)

                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    };

    const startDeletingEvent = async (calendarEvent) => {
        try {
                await calendarApi.delete(`/events/${activeEvent.id}`)

                dispatch(onDeleteEvent({ calendarEvent }));
                return;
        } catch (error) {
            console.log('Error al eliminar eventos');
            console.log(error);
        }

    };

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        };
    };

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}
